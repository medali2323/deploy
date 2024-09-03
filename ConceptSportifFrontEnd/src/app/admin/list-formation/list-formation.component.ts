import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.css']
})
export class ListFormationComponent {
  formations: any;
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

    this.load();
    this.getallcat_formations()
  }
nb:number=0
  load(): void {
    this.httpservice.getAll("formation").subscribe((response: any) => {
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
    this.router.navigate(["/admin/formations/", id]);
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
    this.nouveauformation=f.value;
   
let Categformation = {
  "id": Number(this.nouveauformation.cat_formation)
};

this.nouveauformation.categ_formation = Categformation;
this.nouveauformation.code = 'F' + (this.nb + 1).toString();

console.log(this.nouveauformation);

this.httpservice.create("formation",this.nouveauformation).subscribe(
  (response: any) => {
    this.dtOptions= {};
    this.dtTrigger=new Subject<any>();
    // Gérez la réponse du service (par exemple, affichez un message de succès)
  
    this.ngOnInit();
  },
  (error: any) => {
    alert('Erreur lors de l\'ajout du formation : ' + error.message);
  }
);

   
  }

getallcat_formations(): void {
  this.httpservice.getAll("categFormation").subscribe((response: any) => {
    console.log(response);
    
    this.categ_formations = response;
 
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
  approuve(formation:any){
    if (formation.categ_formation.id===4) {
      let aux = {
        code:formation.code,
        approuve: false,
        date: formation.date,
        nbrParticipant: formation.nbrParticipant,
        sujet: formation.sujet,
        fraisFormation: formation.fraisFormation,
        nbrPlaceMax: formation.nbrPlaceMax,
        emplacement:formation.emplacement,
        instructor:{
          id:formation.instructor.id
        },
        categ_formation:{
          id:formation.categ_formation.id
        }
    };
      formation.approuve=true
      this.httpservice.update("FormationPresentiel", formation.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        this.load()
    
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
    if (formation.categ_formation.id===5) {
      let aux = {
        code:formation.code,
        approuve: true,
        date: formation.date,
        nbrParticipant: formation.nbrParticipant,
        sujet: formation.sujet,
        fraisFormation: formation.fraisFormation,
        nbrPlaceMax: formation.nbrPlaceMax,
        LienMeet:formation.LienMeet,
        instructor:{
          id:formation.instructor.id
        },
        categ_formation:{
          id:formation.categ_formation.id
        }
    };
      this.httpservice.update("FormationEnLigne", formation.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        this.load()
    
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
    if (formation.categ_formation.id===6) {
      let aux = {
        code:formation.code,
        approuve: true,
        date: formation.date,
        nbrParticipant: formation.nbrParticipant,
        sujet: formation.sujet,
        fraisFormation: formation.fraisFormation,
        nbrPlaceMax: formation.nbrPlaceMax,
        LienVideo:formation.LienVideo,
        instructor:{
          id:formation.instructor.id
        },
        categ_formation:{
          id:formation.categ_formation.id
        }
    };
      this.httpservice.update("FormationAlaDemande", formation.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        this.load()
    
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
  }
  dapprouve(formation:any){
    if (formation.categ_formation.id===4) {
      let aux = {
        code:formation.code,
        approuve: false,
        date: formation.date,
        nbrParticipant: formation.nbrParticipant,
        sujet: formation.sujet,
        fraisFormation: formation.fraisFormation,
        nbrPlaceMax: formation.nbrPlaceMax,
        emplacement:formation.emplacement,
        instructor:{
          id:formation.instructor.id
        },
        categ_formation:{
          id:formation.categ_formation.id
        }
    };
      formation.approuve=true
      this.httpservice.update("FormationPresentiel", formation.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        this.load()
    
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
    if (formation.categ_formation.id===5) {
      let aux = {
        code:formation.code,
        approuve: false,
        date: formation.date,
        nbrParticipant: formation.nbrParticipant,
        sujet: formation.sujet,
        fraisFormation: formation.fraisFormation,
        nbrPlaceMax: formation.nbrPlaceMax,
        LienMeet:formation.LienMeet,
        instructor:{
          id:formation.instructor.id
        },
        categ_formation:{
          id:formation.categ_formation.id
        }
    };
      this.httpservice.update("FormationEnLigne", formation.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        this.load()
    
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
    if (formation.categ_formation.id===6) {
      let aux = {
        code:formation.code,
        approuve: false,
        date: formation.date,
        nbrParticipant: formation.nbrParticipant,
        sujet: formation.sujet,
        fraisFormation: formation.fraisFormation,
        nbrPlaceMax: formation.nbrPlaceMax,
        LienVideo:formation.LienVideo,
        instructor:{
          id:formation.instructor.id
        },
        categ_formation:{
          id:formation.categ_formation.id
        }
    };
      this.httpservice.update("FormationAlaDemande", formation.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        this.load()
    
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
  }
}