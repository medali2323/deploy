import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { NgForm } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
 selector: 'app-list-cours',
 templateUrl: './list-cours.component.html',
 styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent {
 isvideo:boolean=false
 ispresentiel:boolean=false
 isenligne:boolean=false
 changeCateg(event: Event) {
  const selectElement = event.target as HTMLSelectElement;
  const selectedValue = selectElement.value;
  console.log('Catégorie sélectionnée :', selectedValue);

  if (selectedValue === '8') {
   this.ispresentiel=true
   this.isenligne=false
   this.isvideo=false
  } else if (selectedValue === '9') {
   this.isenligne=true
   this.isvideo=false
   this.ispresentiel=false


  } else if (selectedValue === '10') {
   this.isvideo=true
   this.ispresentiel=false
   this.isenligne=false

  }
 }

 cours: any;
 sps: any;
 adminIdToDelete: string = '';
 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject<any>();
 Instructeur: any;
 @ViewChild(DataTableDirective, { static: false })
 datatableElement: DataTableDirective | undefined;
 nouveauCours: any = {};
 userFile: any;
 public imagePath: any;
 imgURL: any;
 message: any;
 categoriesCours: any;



 @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
 private _success = new Subject<string>();
 private _erreur = new Subject<string>();
 @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
 successMessage:any=''
 erreurMessage:any=''
 








 courseId: number = 1;
 constructor(private httpService: HttpService, private modalService: NgbModal, private renderer: Renderer2, private elementRef: ElementRef, private router: Router) {}

 ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
 }

 ngOnInit(): void {
  this.dtOptions = {
   pagingType: 'full_numbers',
   searching: true,
   lengthChange: false,
   language: {
    searchPlaceholder: 'Text Customer'
   },
   dom: 'Bfrtip',
  };
  this._success.subscribe(message => this.successMessage = message);
  this._success.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
  }
  });
  this._erreur.subscribe(message => this.erreurMessage = message);
  this._erreur.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
  }
  });
  this.load();
  this.getAllInstructeurs();
  this.getAllCategoriesCours();
 }

 id = Number(localStorage.getItem("i"));
 nb:number=0
 load(): void {
  this.httpService.getById("Cours/instructor", this.id).subscribe((response: any) => {
   console.log(response);
   this.cours = response;
   this.nb=this.cours.length
   this.cours.forEach((element:any) => {
    if (element.lienvideo) {
         
        let x=element.lienvideo.split("/")
        element.lienvideo=x[x.length-1]
    }
   });
   console.log(this.cours);
   
   this.dtTrigger.next(null);
  }, (error: any) => {
   console.error('Erreur lors de la récupération des données:', error);
  });
 }

 edit(id: any) {
  this.router.navigate(["instructeur/cours", id]);
 }

 call_delete_modal(adminId: any) {
  this.adminIdToDelete = adminId;
  console.log(adminId);
 }
ti:any=[
 
{id: 8, code: 'CC_1', description: 'Présentiel'},
{id: 9, code: 'CC_2', description: 'En ligne'},
{id: 10, code: 'CC_3', description: 'A la demande'}
]
 delete() {
  if (this.adminIdToDelete) {
   this.httpService.delete("Cours", Number(this.adminIdToDelete)).subscribe(
    (response) => {
     console.log('Cours supprimé avec succès :', this.adminIdToDelete);
     this.dtOptions = {};
     this.dtTrigger = new Subject<any>();
     this.load();
    },
    (error) => {
     console.error('Erreur lors de la suppression du cours :', error);
    }
   );
  } else {
   console.error('ID du cours à supprimer non spécifié.');
  }
 }
 submitForm(coursForm: NgForm): void {
   
   
 if (this.ispresentiel) 
  {
   
  const aux = coursForm.value;
  aux.instructor={
   id:Number(localStorage.getItem("i"))
  }
  aux.approuve=false
  aux.categorie_cours={
   id:Number(aux.Categorie_cours)
  }
  aux.code = 'CO_' + (this.nb + 1).toString();
  aux.LienVideo=null
  aux.LienMeet=null
  console.log(aux);
  let exist = this.cours.filter((e: any) => 
   e.description === aux.description
  );  console.log(exist.length===0);
  
  if (exist.length>0) {
  console.log("cours exist");
  this._erreur.next("Le cours existe deja !");

  } else 
  this.httpService.create('CourPresentiel', aux).subscribe(
   (coursId) => {
    console.log('Cours ajouté avec succès ! ID du cours :', coursId);
    this._success.next("Le cours a été ajouté avec succès.");
    this.dtOptions= {};
        this.dtTrigger=new Subject<any>();
this.ngOnInit()
  
   
   },
   
   (error) => {
    console.error('Erreur lors de l\'ajout du cours :', error);
   }
  );
 }
 if (this.isenligne) {
  this.httpService.generateMeetLink(coursForm.value.description).subscribe(
   (response) => {
    console.log('Vidéo ajoutée avec succès !', response);
    let lien=response
    const aux = coursForm.value;
    aux.instructor={
     id:Number(localStorage.getItem("i"))
    }
    aux.approuve=false
    aux.categorie_cours={
     id:Number(aux.Categorie_cours)
    }
    aux.code = 'CO_' + (this.nb + 1).toString();
    aux.LienVideo=null
    aux.Emplacement=null
    aux.lienmeet=lien
    console.log(aux);
    let exist = this.cours.filter((e: any) => 
     e.description === aux.description &&
     e.frais === aux.frais &&
     e.date.getTime() === aux.date.getTime() &&
     e.hdeb === aux.hdeb &&
     e.hfin === aux.hfin &&
     e.duree === aux.duree
    );  console.log(exist.length===0);
    
    if (exist.length>0) {
    console.log("cours exist");
    this._erreur.next("Le cours existe deja !");
  
    } else 
    this.httpService.create('CoursEnLigne', aux).subscribe(
     (coursId) => {
      console.log('Cours ajouté avec succès ! ID du cours :', coursId);
      this._success.next("Le cours a été ajouté avec succès.");
      this.dtOptions= {};
      this.dtTrigger=new Subject<any>();
      this.ngOnInit()

    
     
     },
     
     (error) => {
      console.error('Erreur lors de l\'ajout du cours :', error);
     }
    );
   },
   (error) => {
    console.error('Erreur lors de l\'ajout de la vidéo :', error);
   }
  );
 }
 if (this.isvideo) {
  const videoFormData = new FormData();
     console.log(this.userFile);
     
     videoFormData.append('files', this.userFile);

     this.httpService.uploadVideo3(videoFormData).subscribe(
      (response) => {
       console.log('Vidéo ajoutée avec succès !', response);
       let lien=response.filePath
       const aux = coursForm.value;
       aux.instructor={
        id:Number(localStorage.getItem("i"))
       }
       aux.approuve=false
       aux.categorie_cours={
        id:Number(aux.Categorie_cours)
       }
       aux.code = 'CO_' + (this.nb + 1).toString();
       aux.lienvideo=lien
       aux.Emplacement=null
       aux.LienMeet=null
       console.log(aux);
       let exist = this.cours.filter((e: any) => 
        e.description === aux.description &&
        e.frais === aux.frais &&
        e.date.getTime() === aux.date.getTime() &&
        e.hdeb === aux.hdeb &&
        e.hfin === aux.hfin &&
        e.duree === aux.duree
       );  console.log(exist.length===0);
       
       if (exist.length>0) {
       console.log("cours exist");
       this._erreur.next("Le cours existe deja !");
     
       } else 
       this.httpService.create('CourAlaDemande', aux).subscribe(
        (coursId) => {
         console.log('Cours ajouté avec succès ! ID du cours :', coursId);
         this._success.next("Le cours a été ajouté avec succès.");
         this.dtOptions= {};
         this.dtTrigger=new Subject<any>();
         this.ngOnInit()

        
        },
        
        (error) => {
         console.error('Erreur lors de l\'ajout du cours :', error);
        }
       );
			 
      },
      (error) => {
       console.error('Erreur lors de l\'ajout de la vidéo :', error);
      }
     );
 }

  
 }

 getAllInstructeurs(): void {
  this.httpService.getAll("Instructor").subscribe((response: any) => {
   console.log(response);
   this.Instructeur = response;
  });
 }

 detail(id:any){
    this.router.navigate(["instructeur/cours/detail", id]);
}

 getAllCategoriesCours(): void {
  this.httpService.getAll("Categorie_cours").subscribe((response: any) => {
   console.log(response);
   this.categoriesCours = response;
  });
 }

 onSelectFile(event:any) {
  if (event.target.files.length > 0)
  {console.log(event.target.files);
  
   const file = event.target.files[0];
   this.userFile = event.target.files[0];
   
   // this.f['profile'].setValue(file);
 
  var mimeType = event.target.files[0].type;
  if (mimeType.match(/video\/*/) == null) {
   this.message = "Only images are supported.";
   return;
  }
 
  var reader = new FileReader();
  
  this.imagePath = file;
  reader.readAsDataURL(file); 
  reader.onload = (_event) => { 
   this.imgURL = reader.result; 
  }
 }
   
   
  }

 onCloseClick(): void {
  const offcanvasElement = this.elementRef.nativeElement.querySelector('.offcanvas');
  if (offcanvasElement) {
   this.renderer.removeClass(offcanvasElement, 'show');
  }
 }

}