import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, Renderer2, ElementRef, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbAlert, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subject, debounceTime } from "rxjs";
import { HttpService } from "src/app/servises/http.service";
import { AlertComponent } from "src/app/shared/alert/alert.component";

@Component({
  selector: 'app-liste-produits',
  templateUrl: './liste-produits.component.html',
  styleUrls: ['./liste-produits.component.css']
})
export class ListeProduitsComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  
  
  produits: any={};
  produitIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: any;
  nb:number=0
  nouveauproduit:any={
    'categorie_Produit_id':null,
    'pr_client':'',
    'pr_prod':''
  };
  Categorie_Produit:any=[]
  

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
    this.getallCategorie_Produit();
  }

  load(): void {
    this.httpservice.getAll("Produit").subscribe((response: any) => {
      console.log(response);
      this.produits = response;
      this.nb=this.produits.length
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }

  edit(id: any) {
    console.log(id);
    
    this.router.navigateByUrl("/admin/produit/produits/edit/"+id);
  }

  call_delete_modal(produitId: any) {
    this.produitIdToDelete = produitId; // Update the ID to delete when the modal is opened
    console.log(produitId);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.produitIdToDelete) {
      this.httpservice.delete("Produit", Number(this.produitIdToDelete)).subscribe(
        (response) => {
          console.log('produitistrateur supprimé avec succès :', this.produitIdToDelete);
          this._success.next("Le Produit  a supprimé ajouté avec succès.");

          this.load()
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'produitistrateur :', error);
          // Handle errors here
        }
      );
    } else {
      console.error('ID de l\'produitistrateur à supprimer non spécifié.');
      // Handle case where ID to delete is empty
    }
  }
  ajouterproduit(f: NgForm) {
    if (f.invalid) {
        return;
    }
    console.log(f.value);
    this.nouveauproduit = f.value;
    this.nouveauproduit.max_remise = parseFloat(f.value.max_remise);
    this.nouveauproduit.prixventeht = parseFloat(f.value.prix_vente_ht);
    this.nouveauproduit.prixventenetht = parseFloat(f.value.prix_vente_net_ht);
    this.nouveauproduit.prixventettc = parseFloat(f.value.prix_vente_ttc);
    this.nouveauproduit.tauxtva = parseFloat(f.value.taux_tva);
    this.nouveauproduit.codeprod = 'PR_' + (this.nb + 1).toString();
    console.log(this.nouveauproduit);
    
    // Récupérer les données du formulaire
    const formData = new FormData();
    formData.append('codeprod', this.nouveauproduit.codeprod);
    formData.append('desprod', this.nouveauproduit.description);
    formData.append('couleur', this.nouveauproduit.couleur);
    formData.append('dosage', this.nouveauproduit.dosage);
    formData.append('prixventeht', this.nouveauproduit.prixventeht);
    formData.append('prixventenetht', this.nouveauproduit.prixventenetht);
    formData.append('prixventettc', this.nouveauproduit.prixventettc);
    formData.append('tauxtva', this.nouveauproduit.tauxtva);
    formData.append('active', this.nouveauproduit.active ? 'true' : 'false');
    formData.append('codebarre', this.nouveauproduit.codebarre);
    formData.append('file', this.userFile);
    formData.append('maxremise', this.nouveauproduit.max_remise);

    
    formData.append('categorie_Produit', this.nouveauproduit.categorie_Produit_id);
    
    // Envoyer la requête POST
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + token
    });
     
    let exist = this.produits.filter((e: any) => e.desprod === this.nouveauproduit.desprod);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("Produit exist");
    this._erreur.next("Le Produit existe deja !");

   } else 
    this.http.post('http://localhost:8082/api/Produit', formData, { headers }).subscribe(
        (response: any) => {
            this.dtOptions = {};
            this.dtTrigger = new Subject<any>();
            // Gérer la réponse du service (par exemple, afficher un message de succès)
            this.modalService.dismissAll();
            this._success.next("Le Produit  a été ajouté avec succès.");

            this.onCloseClick();
            this.ngOnInit();
        },
        (error: any) => {
            alert('Erreur lors de l\'ajout du produit : ' + error.message);
        }
    );
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
calcul_prix_net_ht() {
  // Récupérer les valeurs des champs prix_vente_ht et taux_tva depuis le modèle
  const prix_ht = parseFloat(this.nouveauproduit.prix_vente_ht);
  const taux_tva = parseFloat(this.nouveauproduit.taux_tva);

  // Calculer le prix net HT en fonction du prix de vente HT et du taux de TVA
  const prix_net_ht = prix_ht ;
  const prix_ttc = prix_ht * (1 + taux_tva / 100);

    // Mettre à jour le champ prix_vente_ttc dans le modèle avec le résultat du calcul
    this.nouveauproduit.prix_vente_ttc = prix_ttc.toFixed(3);  // Mettre à jour le champ prix_vente_net_ht dans le modèle avec le résultat du calcul
  this.nouveauproduit.prix_vente_net_ht = prix_net_ht.toFixed(3);
  this.nouveauproduit.prix_vente_ttc = parseFloat(prix_ttc.toFixed(3));
this.nouveauproduit.prix_vente_net_ht = parseFloat(prix_net_ht.toFixed(3));

}

  getallCategorie_Produit(): void {
    this.httpservice.getAll("Categorie_Produit").subscribe((response: any) => {
      console.log(response);
      
      this.Categorie_Produit = response;
   
    });
}
onCloseClick(): void {
  const offcanvasElement = this.elementRef.nativeElement.querySelector('.offcanvas');
  if (offcanvasElement) {
    this.renderer.removeClass(offcanvasElement, 'show');
  }
}
}
