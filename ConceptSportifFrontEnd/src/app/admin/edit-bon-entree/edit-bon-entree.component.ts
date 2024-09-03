import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-edit-bon-entree',
  templateUrl: './edit-bon-entree.component.html',
  styleUrls: ['./edit-bon-entree.component.css']
})
export class EditBonEntreeComponent {
  BonEntree:any
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
  formattedDate: string='';

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
  id: number=0;
  tab1:any=[]
  tabupdateqte:any=[]
  selectedfournisseurId: number | null = null;

    constructor(private httpservice: HttpService, private modalService: NgbModal,private route:Router,    private router: ActivatedRoute,
    ) {
      this.datebe = new Date(); 
    }
  
    ngOnInit(): void {
      this.id = this.router.snapshot.params['id'];
      this.id= Number(this.id)
      this.getBonEntree(this.id)
      this.getall_Fournisseurs();
      this.getall_Categorie_Produit();  
      this.getall_BonEntree();
      this.fillTable(this.id)
    }
    private formatDate(date: any): string {
      console.log('Input type:', typeof date);
    
      try {
        return date.toISOString().slice(0, 10); // Format as 'yyyy-MM-dd'
      } catch (error) {
        console.error('Error formatting date:', error);
        return ''; // Or handle the error accordingly
      }
    }
    
    getBonEntree(id: number): void {
      this.httpservice.getById("bonentrees",id)
        .subscribe((data) => {
          console.log(data);
          
          this.BonEntree = data;
          this.selectedfournisseurId=data.fournisseur.id

          const dateObject = new Date(this.BonEntree.date); // Convert string to Date object
          this.formattedDate = this.formatDate(dateObject);
            console.log(this.formatDate);
         
        });
    }
 
    getall_BonEntree(): void {
      this.httpservice.getAll("bonentrees").subscribe((response: any) => {
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
    console.log("hhh");
    
     this.t=this.prixventeht*this.qte_prod_input
  }
  fillTable(id: any) {
    this.tab1 = [];
    this.httpservice.getById("LigneProduits/byBonEntree", id).subscribe((response: any) => {
      console.log(response);
      this.tab1 = response;
  
      this.tab1.forEach((element: any) => {
        // Créez l'objet du produit
        let a = {
          id: element.produit.id,
          code: element.produit.codeprod,
          desc: element.produit.desprod,
          qte: element.quantite,
          prix: element.produit.prixventettc,
          total: element.produit.prixventettc * element.quantite,
          idl:element.id
        };
  
        // Cherchez si le produit existe déjà dans tab
        const produitExistant = this.tab.find((prod: any) => prod.id === a.id);
  
        if (produitExistant) {
          // Si le produit existe, mettez à jour la quantité et le total
          produitExistant.qte += a.qte;
          produitExistant.total = produitExistant.prix * produitExistant.qte;
        } else {
          // Si le produit n'existe pas, ajoutez la nouvelle ligne
          this.tab.push(a);
        }
      });
  
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  
  add_ligne_table_prod() {
    let a = {
      id: this.id_prod_input,
      code: this.code_prod_input,
      desc: this.desc_prod_input,
      qte: this.qte_prod_input,
      prix: this.prixventeht,
      total: this.t
    };
    console.log('Nouvelle ligne de produit:', a);
  
    // Chercher si le produit existe déjà dans tab
    const produitExistant = this.tab.find((element: any) => {
      return element.id === a.id;
    });
  
    if (produitExistant) {
      // Si le produit existe, augmenter la quantité de 1 et mettre à jour le total
      produitExistant.qte += 1;
      produitExistant.total = produitExistant.prix * produitExistant.qte;
      this.tabupdateqte.push()
      console.log('Produit existant mis à jour:', produitExistant);
    } else {
      // Si le produit n'existe pas, ajouter une nouvelle ligne
      this.tab.push(a);
      console.log('Nouveau produit ajouté:', a);
    }
  
    console.log('État actuel du tableau des produits:', this.tab);
  
    this.tabupdateqte = this.tab1.filter((e: any) => e.produit.id === a.id && e.bonEntree.id === this.id && e.quantite != a.qte);
    console.log('Mise à jour des quantités:', this.tabupdateqte);
  }
  
  
  removeRow(){
    this.tab = this.tab.filter((item: any) => !item.checked);

  }
  ajouternouvelleBon(f: NgForm): void {
    this.nouvelleBon = f.value;
    console.log(this.nouvelleBon);
    this.nouvelleBon.Fournisseurs = {
      'id': Number(this.nouvelleBon.fournisseur_id)
    };
  
    let t1 = 0;
    console.log(this.tabupdateqte);
    
    for (const e of this.tab) {
      if (e.idl) {
        let aux = {
          produit: {
            id: e.id
          },
          bonEntree: {
            id: this.id
          },
          quantite: e.qte
        };
    
        this.httpservice.update("LigneProduits", e.idl, aux).subscribe((response1: any) => {
          console.log(response1);
        }, (error: any) => {
          alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
        });
      }else{
        let aux = {
          produit: {
            id: e.id
          },
          bonEntree: {
            id: this.id
          },
          quantite: e.qte
        };
    
        this.httpservice.create("LigneProduits", aux).subscribe((response1: any) => {
          console.log(response1);
        }, (error: any) => {
          alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
        });
      }
      this.httpservice.update("bonentrees", this.id, this.BonEntree).subscribe((response2: any) => {
        console.log(response2);
        this.route.navigate(['/admin/stock-vente/bon_entre/liste']);
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    }
    ;
  

  }
  
   
  
  
  
  
  }
  