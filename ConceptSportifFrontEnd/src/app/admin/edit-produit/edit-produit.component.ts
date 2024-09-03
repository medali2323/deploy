import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';
@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent {
  @ViewChild('userForm') userForm: NgForm | undefined;

  produit: any;
  id: number=0;
  categ_produit:any
  catreps:any
  image:any
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: string='';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitService: HttpService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getproduit(this.id);
    this.getallcatreps()
  }
 


  getproduit(id: number): void {
    this.produitService.getById("Produit",id)
      .subscribe((data) => {
        console.log(data);
        
        this.produit = data;
      });
  }

  updateproduit(): void {
  console.log(this.produit);
  

    this.produitService.update("Produit",this.id, this.produit)
      .subscribe((R) => {
        console.log(R);
        
        // Rediriger vers la liste des types d'abonnements après la modification
        this.router.navigate(['/admin/produit/produits/liste']);
      });
  }
  getallcatreps() {
    this.produitService.getAll("Categorie_Produit")
    .subscribe((data) => {
      console.log(data);
      
      this.catreps = data;
    });  }
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
  calcul_prix_net_ht() {
    // Récupérer les valeurs des champs prix_vente_ht et taux_tva depuis le modèle
    const prix_ht = parseFloat(this.produit.prix_vente_ht);
    const taux_tva = parseFloat(this.produit.taux_tva);
  
    // Calculer le prix net HT en fonction du prix de vente HT et du taux de TVA
    const prix_net_ht = prix_ht ;
    const prix_ttc = prix_ht * (1 + taux_tva / 100);
  
      // Mettre à jour le champ prix_vente_ttc dans le modèle avec le résultat du calcul
      this.produit.prix_vente_ttc = prix_ttc.toFixed(3);  // Mettre à jour le champ prix_vente_net_ht dans le modèle avec le résultat du calcul
    this.produit.prix_vente_net_ht = prix_net_ht.toFixed(3);
    this.produit.prix_vente_ttc = parseFloat(prix_ttc.toFixed(3));
  this.produit.prix_vente_net_ht = parseFloat(prix_net_ht.toFixed(3));
  
  }
  
}
