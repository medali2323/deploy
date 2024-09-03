import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-ajouter-bon-entre',
  templateUrl: './ajouter-bon-entre.component.html',
  styleUrls: ['./ajouter-bon-entre.component.css']
})
export class AjouterBonEntreComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  Fournisseurs: any[] = [];
  Categorie_Produits: any[] = [];
  produits:any=[];
  editdata:any
  selectedProductId: number | null = null; // ID du produit sélectionné
  code_prod_input: string = '';
  desc_prod_input:string='';
  id_prod_input:string=''
  prixventeht:number=0
  qte_prod_input:number=1
  t:number=0
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
  total_ttc_be:number=0
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
      this.getall_Fournisseurs();
      this.getall_Categorie_Produit();  
      this.getall_BonEntree();
   
    }
  
    getall_BonEntree(): void {
      this.httpservice.getAll("BonEntree").subscribe((response: any) => {
        console.log(response);
        this.nb = response.length;
     
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
  
    getall_Fournisseurs(): void {
      this.httpservice.getAll("fournisseurs").subscribe((response: any) => {
        console.log(response);
        this.Fournisseurs = response;
     
  
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
    let s =0
    this.tab.forEach((element:any) => {
      s+=element.total
    });
    console.log(s);
    
    this.total_ttc_be=s
    
  }
  add_ligne_table_prod(){
    let a={
      id:this.id_prod_input,
      code:this.code_prod_input,
      desc:this.desc_prod_input,
      qte:this.qte_prod_input,
      prix:this.prixventeht,
      total:this.t
    }
      this.tab.push(a)
      console.log(this.tab);
      this.calcul_total()
  }
  removeRow(){
    this.tab = this.tab.filter((item: any) => !item.checked);
    this.calcul_total()


  }
    ajouternouvelleBon(f: NgForm): void {
     this.nouvelleBon=f.value;
    console.log(this.nouvelleBon);
    this.nouvelleBon.Fournisseurs={
      'id':Number(this.nouvelleBon.fournisseur_id)
    }
   
    let nouvelleBonSansIds = { 
      code: 'BE_'+this.nb.toString(),
      date: this.nouvelleBon.datebe,
      fournisseur: this.nouvelleBon.Fournisseurs,
      montantTTC:this.total_ttc_be,
      totalHT:0
     
    };
    this.httpservice.create("bonentrees", nouvelleBonSansIds).subscribe((response: any) => {
      const b=response
      console.log(response);
      let t=0;
      for (let index = 0; index < this.tab.length; index++) {
        const e = this.tab[index];
        let aux={
          produit:{
            id:e.id
          },
          bonEntree:{
            id:response.id
          },
          quantite:e.qte
        }
        this.httpservice.create("LigneProduits", aux).subscribe((response1: any) => {
          console.log(response);
          
      
    
          
        }, (error: any) => {
          alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
        });
        t+=e.prix

      }
      b.totalHT=t
        this.httpservice.update("bonentrees", response.id,b).subscribe((response2: any) => {
          console.log(response);
          
      
    
          
        }, (error: any) => {
          alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
        });
        this._success.next("Le bon d'entré a été ajouté avec succès.");

        this.route.navigate(['/admin/stock-vente/bon_entre/liste']);

    }, (error: any) => {
      alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
    });
    }
   
 
  
  }
  