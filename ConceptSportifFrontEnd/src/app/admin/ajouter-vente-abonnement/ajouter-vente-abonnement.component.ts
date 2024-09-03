import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/servises/http.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-ajouter-vente-abonnement',
  templateUrl: './ajouter-vente-abonnement.component.html',
  styleUrls: ['./ajouter-vente-abonnement.component.css']
})
export class AjouterVenteAbonnementComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  Instructor: any[] = [];
  TypeAbonnement: any[] = [];
  nb:number=0
  editdata:any
  nouvelleVente: any = { 
    description: '',
    code: '',
    instructeur_id: null,
    type_abo_id: null,
    nb_mois: null,
    prix_ht: null,
    taux_tva: null,
    prix_ttc: null,
    date_deb: '',
    date_fin: '',
    paiement: 0
  };
  currentDate:any
  abonnementsExistants:any=[]
    constructor(private httpservice: HttpService, private modalService: NgbModal,private route:Router) {}
  
    ngOnInit(): void {
      this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
    this._erreur.subscribe(message => this.erreurMessage = message);
    this._erreur.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
      const today = new Date();
    this.currentDate = today.toISOString().substring(0, 10);
      this.getall_Instructor();
      this.getall_TypeAbonnement()
;  
this.httpservice.getAll("Vente_abonnement").subscribe((response: any) => {
  this.nb=response.length
 
  
}, (error: any) => {
  alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
});
    }
  loadabonnementi(id:number){
    this.httpservice.getById("Vente_abonnement/instructor",id).subscribe((response: any) => {
      this.abonnementsExistants=response
      console.log(this.abonnementsExistants);

      console.log(id);
      
      
    }, (error: any) => {
      alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
    });
  }
  loadtab(){
    let t: any = this.TypeAbonnement.find(u => u.id === Number(this.nouvelleVente.type_abo_id));
    console.log(this.nouvelleVente);
    console.log(t);
    if (t) { // Vérifiez si l'élément est trouvé avant d'accéder à ses propriétés
      this.nouvelleVente.code = t.code;
      this.nouvelleVente.description = t.description;
      this.nouvelleVente.nb_mois=t.nembre_mois
      this.nouvelleVente.prix_ht=t.prix_u_ht
      this.nouvelleVente.prix_ttc=t.prix_u_ttc
      this.nouvelleVente.taux_tva=t.taux_tva
      this.nouvelleVente.paiement=t.prix_u_ttc
      console.log(this.nouvelleVente);
    } else {
      console.log("Type d'abonnement introuvable.");
    }
  }
  
    getall_Instructor(): void {
      this.httpservice.getAll("Instructor").subscribe((response: any) => {
        console.log(response);
        this.Instructor = response;
     
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
    getall_TypeAbonnement(): void {
      this.httpservice.getAll("TypeAbonnement").subscribe((response: any) => {
        console.log(response);
        this.TypeAbonnement = response;
     
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
    ajouternouvelleVente(f: NgForm): void {
     this.nouvelleVente=f.value;
    console.log(this.nouvelleVente);
    this.nouvelleVente.instructor={
      'id':Number(this.nouvelleVente.instructeur_id)
    }
    this.nouvelleVente.typeAbonnement={
      'id':Number(this.nouvelleVente.type_abo_id)
    }
    let nouvelleVenteSansIds = { 
      description: this.nouvelleVente.description,
      code: 'VABS_'+(this.nb+1).toString(),
      montantTtc: this.nouvelleVente.prix_ttc,
      montantHt: this.nouvelleVente.prix_ht,
      dateVente:this.currentDate,
      tauxTva: this.nouvelleVente.taux_tva,
      datedeb: this.nouvelleVente.date_deb,
      datefiin: this.nouvelleVente.date_fin,
      paiement: this.nouvelleVente.paiement,
      solder:true,
      dernierVente:true,
      instructor: this.nouvelleVente.instructor,
      typeAbonnement: this.nouvelleVente.typeAbonnement
    };
 console.log(nouvelleVenteSansIds);
    console.log(this.isOverlappingPeriod);
    
   if (this.isOverlappingPeriod()) {
    this._erreur.next("Une abonnement existe deja dans cette période !");
    this.loadtab()
   } else {
    this.httpservice.create("Vente_abonnement", nouvelleVenteSansIds).subscribe((response: any) => {
      this._success.next("La vente d'abonnement a été ajouté avec succès.");
    
      this.route.navigate(["/admin/vente_abos/liste"])
    }, (error: any) => {
      alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
    });
   }

    }
    calculate_date_fin(){
      if (this.nouvelleVente.date_deb) {
        const dateDeb = new Date(this.nouvelleVente.date_deb);
        const dateFin = new Date(dateDeb.setMonth(dateDeb.getMonth() + this.nouvelleVente.nb_mois));
        this.nouvelleVente.date_fin = dateFin.toISOString().substring(0, 10);
        console.log(dateFin.toISOString().substring(0, 10));
        
      }
    }
    isOverlappingPeriod(): boolean {
      const newStartDate = new Date(this.nouvelleVente.date_deb);
      const newEndDate = new Date(this.nouvelleVente.date_fin);
      console.log(this.abonnementsExistants);
      
      return this.abonnementsExistants.some((abonnement:any) => {
        const existingStartDate = new Date(abonnement.datedeb);
        const existingEndDate = new Date(abonnement.datefiin);
        return (newStartDate <= existingEndDate && newEndDate >= existingStartDate);
      });
    }
  
  }
  