import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-list-evenement',
  templateUrl: './list-evenement.component.html',
  styleUrls: ['./list-evenement.component.css']
})
export class ListEvenementComponent {
  Evenements: any;
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
    successMessage:any=''
  erreurMessage:any=''
  
  sps:any;
  adminIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Instructeur:any
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;
  nouveauEvenement: any = {};
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: any;
  categ_Evenements:any
  selfClosingAlert: any;
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

  }

  load(): void {
    this.httpservice.getAll("evenements").subscribe((response: any) => {
      console.log(response);
      this.Evenements = response;
     // this.Evenements = this.Evenements.filter((u: any) => u.roles[0].name === "Role_Evenement");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
    
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
    this._erreur.subscribe(message => this.erreurMessage = message);
    this._erreur.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
  }
  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["/admin/evenement/edit/", id]);
  }

  call_delete_modal(adminId: any) {
    this.adminIdToDelete = adminId; // Update the ID to delete when the modal is opened
    console.log(adminId);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.adminIdToDelete) {
      this.httpservice.delete("Evenement", Number(this.adminIdToDelete)).subscribe(
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



  onCloseClick(): void {
    const offcanvasElement = this.elementRef.nativeElement.querySelector('.offcanvas');
    if (offcanvasElement) {
      this.renderer.removeClass(offcanvasElement, 'show');
    }
  }
  approuve(evenement:any){
 if (evenement.typeEvenement.id===2) {
  let aux = {
    id: evenement.id, // Si l'identifiant est de type Long
    code: evenement.code,
    description: evenement.description,
    fait: true,
    dateDebut: evenement.dateDebut, // Date de début de type Date
    dateFin: evenement.dateFin, // Date de fin de type Date
    heureDebut: evenement.heureDebut,
    heureFin: evenement.heureFin,
    nbrParticipant: evenement.nbrParticipant, // Nombre de participants de type int
    nbrPlaceDispo: evenement.nbrPlaceDispo, // Nombre de places disponibles de type int
    nbrPlaceRestant: evenement.nbrPlaceRestant, // Nombre de places restantes de type int
    approuve: true, // Si approuvé, mettre à true
    typeEvenement: {
        id: evenement.typeEvenement.id
    },
    linkMeet:evenement.linkMeet
};

  this.httpservice.update("EvenementEnLigne", evenement.id,aux).subscribe((ruv: any) => {
    console.log(ruv);
    this._success.next("Lévènement a été approuvé  avec succès.");
    this.load()


    
  }, (error: any) => {
    alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
  });
 }
 if (evenement.typeEvenement.id===1) {
  let aux = {
    id: evenement.id, // Si l'identifiant est de type Long
    code: evenement.code,
    description: evenement.description,
    fait: true,
    dateDebut: evenement.dateDebut, // Date de début de type Date
    dateFin: evenement.dateFin, // Date de fin de type Date
    heureDebut: evenement.heureDebut,
    heureFin: evenement.heureFin,
    nbrParticipant: evenement.nbrParticipant, // Nombre de participants de type int
    nbrPlaceDispo: evenement.nbrPlaceDispo, // Nombre de places disponibles de type int
    nbrPlaceRestant: evenement.nbrPlaceRestant, // Nombre de places restantes de type int
    approuve: true, // Si approuvé, mettre à true
    typeEvenement: {
        id: evenement.typeEvenement.id
    },
    emplacement:evenement.emplacement
};
  this.httpservice.update("EvenementPresentiel", evenement.id,aux).subscribe((ruv: any) => {
    console.log(ruv);
    this._success.next("Lévènement a été approuvé  avec succès.");
    this.load()


    
  }, (error: any) => {
    alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
  });
 }
  }
  dapprouve(evenement:any){
    if (evenement.typeEvenement.id===2) {
     let aux = {
       id: evenement.id, // Si l'identifiant est de type Long
       code: evenement.code,
       description: evenement.description,
       fait: evenement.fait,
       dateDebut: evenement.dateDebut, // Date de début de type Date
       dateFin: evenement.dateFin, // Date de fin de type Date
       heureDebut: evenement.heureDebut,
       heureFin: evenement.heureFin,
       nbrParticipant: evenement.nbrParticipant, // Nombre de participants de type int
       nbrPlaceDispo: evenement.nbrPlaceDispo, // Nombre de places disponibles de type int
       nbrPlaceRestant: evenement.nbrPlaceRestant, // Nombre de places restantes de type int
       approuve: true, // Si approuvé, mettre à true
       typeEvenement: {
           id: evenement.typeEvenement.id
       },
       linkMeet:evenement.linkMeet
   };
   
     this.httpservice.update("EvenementEnLigne", evenement.id,aux).subscribe((ruv: any) => {
       console.log(ruv);
       
   
   
       
     }, (error: any) => {
       alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
     });
    }
    if (evenement.typeEvenement.id===1) {
     let aux = {
       id: evenement.id, // Si l'identifiant est de type Long
       code: evenement.code,
       description: evenement.description,
       fait: evenement.fait,
       dateDebut: evenement.dateDebut, // Date de début de type Date
       dateFin: evenement.dateFin, // Date de fin de type Date
       heureDebut: evenement.heureDebut,
       heureFin: evenement.heureFin,
       nbrParticipant: evenement.nbrParticipant, // Nombre de participants de type int
       nbrPlaceDispo: evenement.nbrPlaceDispo, // Nombre de places disponibles de type int
       nbrPlaceRestant: evenement.nbrPlaceRestant, // Nombre de places restantes de type int
       approuve: false, // Si approuvé, mettre à true
       typeEvenement: {
           id: evenement.typeEvenement.id
       },
       emplacement:evenement.emplacement
   };
     this.httpservice.update("EvenementPresentiel", evenement.id,aux).subscribe((ruv: any) => {
       console.log(ruv);
       
   
   
       
     }, (error: any) => {
       alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
     });
    }
     }
}
