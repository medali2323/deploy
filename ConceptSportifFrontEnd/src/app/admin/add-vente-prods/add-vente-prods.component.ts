import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-add-vente-prods',
  templateUrl: './add-vente-prods.component.html',
  styleUrls: ['./add-vente-prods.component.css']
})
export class AddVenteProdsComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  Instructor: any[] = [];
  Categorie_Produits: any[] = [];
  produits:any=[];
  editdata:any
  selectedProductId: number | null = null; // ID du produit sélectionné
  code_prod_input: string = '';
  desc_prod_input:string='';
  id_prod_input:string=''
  prixventeht:number=0
  qte_prod_input:number=1
  code_prod_input1: string = '';
  desc_prod_input1:string='';
  id_prod_input1:string=''
  prixventeht1:number=0
  qte_prod_input1:number=1
  t:number=0
  tot:number=0
  totttc:number=0
  tab:any=[]
  nb:number=0
  nouvelleBon: any = { 
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
  datebe: Date;
  tva:any
    constructor(private httpservice: HttpService, private modalService: NgbModal,private route:Router) {
      this.datebe = new Date(); 
    }
  
    ngOnInit(): void {
      this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
    this._erreur.subscribe(message => this.erreurMessage = message);
    this._erreur.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
      this.getall_Instructor();
      this.getall_Categorie_Produit();  
      this.getall_Vente_prod();
   
    }
  
    getall_Vente_prod(): void {
      this.httpservice.getAll("Vente_prod").subscribe((response: any) => {
        console.log(response);
        this.nb = response.length;
     
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }

  
    getall_Instructor(): void {
      this.httpservice.getAll("Instructor").subscribe((response: any) => {
        console.log(response);
        this.Instructor = response;
     
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
    getall_Categorie_Produit(): void {
      this.httpservice.getAll("Categorie_Produit").subscribe((response: any) => {
        console.log(response);
        this.Categorie_Produits = response;
     
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
    getall_Produit_by_categorie(id:any): void {
      this.httpservice.getById("Categorie_Produit/produits",id).subscribe((response: any) => {
        console.log(response);
        this.produits = response;
     
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
    remplir_partie_detail() {
      console.log("hhh");
      
      const selectedProductId = this.selectedProductId;
      console.log(selectedProductId);
      console.log(this.produits);
      
      const selectedProduct = this.produits.find((prod:any) => prod.id == selectedProductId);
  
      if (selectedProduct) {
        console.log(selectedProduct);
        
          // Mettez à jour les valeurs des champs de votre table avec les informations du produit sélectionné
          this.code_prod_input = selectedProduct.codeprod;
          this.desc_prod_input = selectedProduct.desprod;
          this.id_prod_input = selectedProduct.id;
          this.prixventeht=selectedProduct.prixventeht
          this.t=this.prixventeht
          this.tva=selectedProduct.tauxtva
          // Autres mises à jour nécessaires selon vos besoins
      } else {
        console.log("aaaaaa");
        
          // Réinitialisez les champs de la table si aucun produit n'est sélectionné
          this.code_prod_input = '';
          this.desc_prod_input = '';
          this.id_prod_input = '';
          // Réinitialisez d'autres champs au besoin
      }
  }
  calcul_total(){
    let tot=0
    let totttc=0
    this.tab.forEach((element:any) => {
      tot+=element.prixnet
      totttc+=element.prixttc
    });    
     this.tot=tot
     this.totttc=totttc
  }
  add_ligne_table_prod() {

    // Vérifie si l'élément existe déjà dans tab
    const existingItem = this.tab.find((item:any) => item.id === this.id_prod_input &&item.qte===this.qte_prod_input);
    console.log(existingItem);
    
    if (existingItem) {
        // Élément déjà présent, effectuez ici les actions que vous souhaitez
        console.log("L'élément existe déjà dans le tableau.");
    } else {
        // Ajoute l'élément au tableau
        const existingItem = this.tab.find((item:any) => item.id === this.id_prod_input);
        if (existingItem) {
          // Élément déjà présent, effectuez ici les actions que vous souhaitez

          
      } else {
        let a = {
          id: this.id_prod_input,
          code: this.code_prod_input,
          desc: this.desc_prod_input,
          qte: this.qte_prod_input,
          prix: this.prixventeht,
          total: this.t,
          prixnet: this.prixventeht * this.qte_prod_input,
          tva: this.tva,
          prixttc: (this.prixventeht * this.qte_prod_input) * (1 + this.tva / 100)
      };
        this.tab.push(a);
        console.log(this.tab);
        this.calcul_total()
    }
  }
}

  removeRow(){
    this.tab = this.tab.filter((item: any) => !item.checked);
    this.calcul_total()

  }
    ajouternouvelleBon(f: NgForm): void {
     this.nouvelleBon=f.value;
    console.log(this.nouvelleBon);
    this.nouvelleBon.Instructor={
      'id':Number(this.nouvelleBon.instructeur_id)
    }
   
    let nouvelleBonSansIds = { 
      code: 'VE_'+this.nb.toString(),
      dateVente: this.nouvelleBon.datebe,
      instructor: this.nouvelleBon.Instructor,
      totHt:this.nouvelleBon.total_net_ht_final,
      totTtc:this.nouvelleBon.tot_ttc_final,
      encaisse:false
    };
  console.log(nouvelleBonSansIds);
  console.log(this.tab);
  
  this.httpservice.create("Vente_prod", nouvelleBonSansIds).subscribe((response: any) => {
    const b=response
    console.log(response);
    let t=0;
    for (let index = 0; index < this.tab.length; index++) {
      const e = this.tab[index];
      console.log(e);
      
      let aux={
        produit:{
          id:e.id
        },
        venteProd:{
          id:response.id
        },
        qte:e.qte,
        remise:e.remise
      }
      this.httpservice.create("Lignevente", aux).subscribe((response1: any) => {
        console.log(response);
        
    
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
      t+=e.prix

    }
        
    this._success.next("La vente a été ajoutée avec succès.");

               this.route.navigate(["/admin/vente_prods/liste"])



  }, (error: any) => {
    alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
  });
   // 

    }
   
 
  
  }
  