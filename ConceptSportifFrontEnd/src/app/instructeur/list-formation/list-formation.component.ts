import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.css']
})
export class ListFormationComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  formations: any;
  isvideo:boolean=false
  ispresentiel:boolean=false
  isenligne:boolean=false
  changeCateg(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log('Catégorie sélectionnée :', selectedValue);

    if (selectedValue === '4') {
      this.ispresentiel=true
      this.isenligne=false
      this.isvideo=false
    } else if (selectedValue === '5') {
      this.isenligne=true
      this.isvideo=false
      this.ispresentiel=false


    } else if (selectedValue === '6') {
      this.isvideo=true
      this.ispresentiel=false
      this.isenligne=false

    }
  }

  sps:any;
  adminIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Instructeur:any
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;
  nouveauformation: any = {};
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: any;
  categ_formations:any
  constructor(private httpservice: HttpService, private modalService: NgbModal,private http: HttpClient,private renderer: Renderer2, private elementRef: ElementRef,private router:Router) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  ti:any=[
  
    {id: 4, code: 'CC_1', description: 'Présentiel'},
    {id: 5, code: 'CC_2', description: 'En ligne'},
    {id: 6, code: 'CC_3', description: 'A la demande'}
    ]
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
    this.getallcat_formations()
  }
nb:number=0
id = Number(localStorage.getItem("i"));
  load(): void {
    this.httpservice.getById("formation/instructor",this.id).subscribe((response: any) => {
      console.log(response);
      this.formations = response;
      this.nb=response.length
     // this.formations = this.formations.filter((u: any) => u.roles[0].name === "Role_formation");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["/instructeur/formation/", id]);
  }

  call_delete_modal(adminId: any) {
    this.adminIdToDelete = adminId; // Update the ID to delete when the modal is opened
    console.log(adminId);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.adminIdToDelete) {
      this.httpservice.delete("formation", Number(this.adminIdToDelete)).subscribe(
        (response) => {
          console.log('Administrateur supprimé avec succès :', this.adminIdToDelete);
    
          this._success.next("La formation  a été supprimé avec succès.");
          this.dtOptions= {};
          this.dtTrigger=new Subject<any>();
          this.ngOnInit()
          this.load()
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'administrateur :', error);
          // Handle errors here
        }
      );
    } else {
      console.error('ID de l\'administrateur à supprimer non spécifié.');
      // Handle case where ID to delete is empty
    }
  }

  submitForm(coursForm: NgForm): void {
     
      
    if (this.ispresentiel) {
      const aux = coursForm.value;
      aux.instructor={
        id:Number(localStorage.getItem("i"))
      }
      aux.approuve=false
      let Categformation = {
        "id": Number(aux.cat_formation)
      };
      
    aux.categ_formation = Categformation;
    aux.code = 'F' + (this.nb + 1).toString();
      aux.LienVideo=null
      aux.LienMeet=null
      console.log(aux);
      let exist = this.formations.filter((e: any) => e.sujet === this.nouveauformation.sujet);
      console.log(exist.length===0);
      
     if (exist.length>0) {
      console.log("pays exist");
      this._erreur.next("La formation existe deja !");
  
     } else 
      this.httpservice.create('FormationPresentiel', aux).subscribe(
        (coursId) => {
          console.log('Cours ajouté avec succès ! ID du cours :', coursId);
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
      this.httpservice.generateMeetLink(coursForm.value.sujet+"/"+coursForm.value.date).subscribe(
        (response) => {
          console.log('Vidéo ajoutée avec succès !', response);
          let lien=response
          const aux = coursForm.value;
          aux.instructor={
            id:Number(localStorage.getItem("i"))
          }
          aux.approuve=false
          
let Categformation = {
  "id": Number(this.nouveauformation.cat_formation)
};

aux.categ_formation =  {
  "id": Number(aux.cat_formation)
};
aux.code = 'F' + (this.nb + 1).toString();
          aux.LienVideo=null
          aux.Emplacement=null
          aux.lienMeet=lien
          console.log(aux);
          let exist = this.formations.filter((e: any) => e.sujet === this.nouveauformation.sujet);
          console.log(exist.length===0);
          
         if (exist.length>0) {
          console.log("pays exist");
          this._erreur.next("La formation existe deja !");
      
         } else 
          this.httpservice.create('FormationEnLigne', aux).subscribe(
            (coursId) => {
              console.log('Cours ajouté avec succès ! ID du cours :', coursId);
              this._success.next("La formation  a été ajouté avec succès.");
              this.dtOptions= {};
              this.dtTrigger=new Subject<any>();
              this.load()

          
            
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
  
            this.httpservice.uploadVideo3(videoFormData).subscribe(
              (response) => {
                this._success.next("La formation  a été ajouté avec succès.");

                console.log('Vidéo ajoutée avec succès !', response);
                let lien=response.filePath
                const aux = coursForm.value;
                aux.instructor={
                  id:Number(localStorage.getItem("i"))
                }
                aux.approuve=false
                let Categformation = {
                  "id": Number(this.nouveauformation.cat_formation)
                };
                
              aux.categ_formation =  {
                "id": Number(aux.cat_formation)
              };
              aux.code = 'F' + (this.nb + 1).toString();
                aux.lienVideo=lien
                aux.Emplacement=null
                aux.LienMeet=null
                console.log(aux);
                let exist = this.formations.filter((e: any) => e.sujet === this.nouveauformation.sujet);
                console.log(exist.length===0);
                
               if (exist.length>0) {
                console.log("pays exist");
                this._erreur.next("La formation existe deja !");
            
               } else 
                this.httpservice.create('FormationAlaDemande', aux).subscribe(
                  (coursId) => {
                    console.log('Cours ajouté avec succès ! ID du cours :', coursId);
                    this._success.next("La formation  a été ajouté avec succès.");
                    this.dtOptions= {};
                    this.dtTrigger=new Subject<any>();
                    this.load()
                
                  
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
  
getallcat_formations(): void {
  this.httpservice.getAll("categFormation").subscribe((response: any) => {
    console.log(response);
    
    this.categ_formations = response;
 
  });
}

onSelectFile(event:any) {
  if (event.target.files.length > 0)
  {console.log(event.target.files);
  
    const file = event.target.files[0];
    this.userFile =  event.target.files[0];
   
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
