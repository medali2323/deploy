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
  selector: 'app-listcours',
  templateUrl: './listcours.component.html',
  styleUrls: ['./listcours.component.css']
})
export class ListcoursComponent {
  courss: any;
  sps:any;
  adminIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Instructeur:any
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;
  nouveaucours: any = {};
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: any;
  categ_courss:any
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  constructor(private httpservice: HttpService, private modalService: NgbModal,private http: HttpClient,private renderer: Renderer2, private elementRef: ElementRef,private router:Router) {}

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
    this.getallcat_courss()
  }
nb:number=0
  load(): void {
    this.httpservice.getAll("Cours").subscribe((response: any) => {
      console.log(response);
      this.courss = response;
      this.nb=response.length
     // this.courss = this.courss.filter((u: any) => u.roles[0].name === "Role_cours");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["/admin/courss/", id]);
  }

  call_delete_modal(adminId: any) {
    this.adminIdToDelete = adminId; // Update the ID to delete when the modal is opened
    console.log(adminId);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.adminIdToDelete) {
      this.httpservice.delete("cours", Number(this.adminIdToDelete)).subscribe(
        (response) => {
          console.log('Administrateur supprimé avec succès :', this.adminIdToDelete);
          this.dtOptions= {};
          this.dtTrigger=new Subject<any>();
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
  submitForm(f:NgForm) {

    if (f.invalid) {
      return;
    }
    this.nouveaucours=f.value;
   
let Categcours = {
  "id": Number(this.nouveaucours.cat_cours)
};

this.nouveaucours.categ_cours = Categcours;
this.nouveaucours.code = 'CO_' + (this.nb + 1).toString();

console.log(this.nouveaucours);

this.httpservice.create("cours",this.nouveaucours).subscribe(
  (response: any) => {
    this.dtOptions= {};
    this.dtTrigger=new Subject<any>();
    // Gérez la réponse du service (par exemple, affichez un message de succès)
  
    this.ngOnInit();
  },
  (error: any) => {
    alert('Erreur lors de l\'ajout du cours : ' + error.message);
  }
);

   
  }

getallcat_courss(): void {
  this.httpservice.getAll("categcours").subscribe((response: any) => {
    console.log(response);
    
    this.categ_courss = response;
 
  });
}
onSelectFile(event:any) {
  if (event.target.files.length > 0)
  {
    const file = event.target.files[0];
    this.userFile = file;
   // this.f['profile'].setValue(file);

  var mimeType = event.target.files[0].type;
  if (mimeType.match(/image\/*/) == null) {
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
  approuve(cours:any){
    if (cours.categorie_cours.id===8) {
      let aux = 
      {
        code:cours.code,
        approuve: true,
        date: cours.date,
        description: cours.description,
        duree: cours.duree,
        frais: cours.frais,
        hdeb: cours.hdeb,
        hfin: cours.hfin,
        emplacement:cours.emplacement,
        instructor:{
          id:cours.instructor.id
        },
        categorie_cours:{
          id:cours.categorie_cours.id
        }
    };
      this.httpservice.update("CourPresentiel", cours.id,aux).subscribe((ruv: any) => {
        this._success.next("Le cour  a été approuvé avec succès.");

        console.log(ruv);
        this.load();
    
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
    if (cours.categorie_cours.id===9) {
      let aux = 
      {
        code:cours.code,
        approuve: true,
        date: cours.date,
        description: cours.description,
        duree: cours.duree,
        frais: cours.frais,
        hdeb: cours.hdeb,
        hfin: cours.hfin,
        lienmeet:cours.lienmeet,
        instructor:{
          id:cours.instructor.id
        },
        categorie_cours:{
          id:cours.categorie_cours.id
        }
    };
      this.httpservice.update("CoursEnLigne", cours.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        this._success.next("Le cour  a été approuvé avec succès.");

    this.load()
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
    if (cours.categorie_cours.id===10) {
      let aux = 
      {
        code:cours.code,
        approuve: true,
        date: cours.date,
        description: cours.description,
        duree: cours.duree,
        frais: cours.frais,
        hdeb: cours.hdeb,
        hfin: cours.hfin,
        lienvideo:cours.lienvideo,
        instructor:{
          id:cours.instructor.id
        },
        categorie_cours:{
          id:cours.categorie_cours.id
        }
    };
      this.httpservice.update("CourAlaDemande", cours.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        this._success.next("Le cour  a été approuvé avec succès.");

    this.load()
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
  }
  dapprouve(cours:any){
    
    if (cours.categorie_cours.id===8) {
      let aux = 
      {
        code:cours.code,
        approuve: false,
        date: cours.date,
        description: cours.description,
        duree: cours.duree,
        frais: cours.frais,
        hdeb: cours.hdeb,
        hfin: cours.hfin,
        emplacement:cours.emplacement,
        instructor:{
          id:cours.instructor.id
        },
        categorie_cours:{
          id:cours.categorie_cours.id
        }
    };
      this.httpservice.update("CourPresentiel", cours.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        this._success.next("Le cour  a été déapprouvé avec succès.");
   
    this.load()
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
    if (cours.categorie_cours.id===9) {
      let aux = 
      {
        code:cours.code,
        approuve: false,
        date: cours.date,
        description: cours.description,
        duree: cours.duree,
        frais: cours.frais,
        hdeb: cours.hdeb,
        hfin: cours.hfin,
        lienmeet:cours.lienmeet,
        instructor:{
          id:cours.instructor.id
        },
        categorie_cours:{
          id:cours.categorie_cours.id
        }
    };
      this.httpservice.update("CoursEnLigne", cours.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        this._success.next("Le cour  a été déapprouvé avec succès.");

    this.load()
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
    if (cours.categorie_cours.id===10) {
      let aux = 
      {
        code:cours.code,
        approuve: false,
        date: cours.date,
        description: cours.description,
        duree: cours.duree,
        frais: cours.frais,
        hdeb: cours.hdeb,
        hfin: cours.hfin,
        lienvideo:cours.lienvideo,
        instructor:{
          id:cours.instructor.id
        },
        categorie_cours:{
          id:cours.categorie_cours.id
        }
    };
      this.httpservice.update("CourAlaDemande", cours.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        this._success.next("Le cour  a été déapprouvé avec succès.");
   
    this.load()
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
  }
}