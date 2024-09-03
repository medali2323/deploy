import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';



@Component({
  selector: 'app-liste-type-abonnements',
  templateUrl: './liste-type-abonnements.component.html',
  styleUrls: ['./liste-type-abonnements.component.css']
})
export class ListeTypeAbonnementsComponent {
  @ViewChild('offcanvasAddUser') offcanvasElement!: ElementRef;

  Type_abonnement: any={};
  nb:number=0
  type_abonnementIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  nouveauType_abonnement:any={
  
  };
  Categ_abonnement:any=[]
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  constructor(private httpservice: HttpService, private modalService: NgbModal,private renderer: Renderer2, private elementRef: ElementRef,private  router:Router) {}

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
    this.getallType_abonnement(); 
    this.getallCateg_abonnement()
  }

  getallType_abonnement(): void {
    
    this.httpservice.getAll("TypeAbonnement").subscribe((response: any) => {
      console.log(response);
      this.Type_abonnement = response;
      this.nb=this.Type_abonnement.length
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }

  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["/admin/abonnement/type_abonnement/edit/", id]);
  }

  call_delete_modal(type_abonnementId: any) {
    this.type_abonnementIdToDelete = type_abonnementId; // Update the ID to delete when the modal is opened
    console.log(this.type_abonnementIdToDelete);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.type_abonnementIdToDelete) {
      this.httpservice.delete("TypeAbonnement", Number(this.type_abonnementIdToDelete)).subscribe(
        (response) => {
          console.log('TypeAbonnement supprimé avec succès :', this.type_abonnementIdToDelete);
          this._success.next("Le type d'abonnement  a été supprimé avec succès.");

          this.modalService.dismissAll();
          this.ngOnInit()  ;    
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
  ajouterType_abonnement(form: NgForm): void {
    this.nouveauType_abonnement=form.value;
    this.nouveauType_abonnement.code = 'TA_' + (this.nb + 1).toString();
    let categ_abonnement = {
        "id": Number(this.nouveauType_abonnement.cat_inst_id)
    };
    this.nouveauType_abonnement.categ_abonnement = categ_abonnement;

    console.log(this.nouveauType_abonnement);
    let exist = this.Type_abonnement.filter((e: any) =>  e.categ_abonnement.id === this.nouveauType_abonnement.categ_abonnement.id && e.nembre_mois === this.nouveauType_abonnement.nembre_mois);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("type d'abonnement exist");
    this._erreur.next("Le type d'abonnement existe deja !");

   } else 
    this.httpservice.create("TypeAbonnement", this.nouveauType_abonnement).subscribe((response: any) => {
      this.dtOptions={}
      this.dtTrigger=new Subject()
        console.log(response); // Affichez la réponse du backend dans la console
        // Ajoutez ici d'autres actions à effectuer après la création réussie des données
        this.modalService.dismissAll();
        this.onCloseClick();
        this._success.next("Le type d'abonnement  a été ajouté avec succès.");

        this.ngOnInit();
    }, (error: any) => {
        console.error('Erreur lors de la création des données:', error); // Gérez les erreurs
    });
}

  getallCateg_abonnement(): void {
    this.httpservice.getAll("categ_abonnement").subscribe((response: any) => {
      console.log(response);
      
      this.Categ_abonnement = response;
   
    });
  }
  onCloseClick(): void {
    const offcanvasElement = this.elementRef.nativeElement.querySelector('.offcanvas');
    if (offcanvasElement) {
      this.renderer.removeClass(offcanvasElement, 'show');
    }
  }
  calcul_prix_net_ht() {
    
    // Récupérer les valeurs des champs prix_vente_ht et taux_tva depuis le modèle
    const prix_ht = parseFloat(this.nouveauType_abonnement.prix_u_ht);
    const taux_tva = parseFloat(this.nouveauType_abonnement.taux_tva);
  
    // Calculer le prix net HT en fonction du prix de vente HT et du taux de TVA
    const prix_ttc = prix_ht * (1 + taux_tva / 100);
  
      // Mettre à jour le champ prix_vente_ttc dans le modèle avec le résultat du calcul
      this.nouveauType_abonnement.prix_u_ttc = prix_ttc.toFixed(3);  // Mettre à jour le champ prix_vente_net_ht dans le modèle avec le résultat du calcul
    this.nouveauType_abonnement.prix_u_ttc = parseFloat(prix_ttc.toFixed(3));
  
  }
}
