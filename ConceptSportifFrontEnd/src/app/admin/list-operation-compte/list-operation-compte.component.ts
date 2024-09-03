import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Inject, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-list-operation-compte',
  templateUrl: './list-operation-compte.component.html',
  styleUrls: ['./list-operation-compte.component.css']
})
export class ListOperationCompteComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  dates = { startDate: '', endDate: '' };

  compte: any={};
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
  id = this.route.snapshot.params['id'];
  operations:any=[]
  Categorie_Produit:any=[]
  newoperation:any={
    montant:0,
    type:'Débit'
  }
  nb1:number=0

  constructor(private httpservice: HttpService, private modalService: NgbModal,private http: HttpClient,private renderer: Renderer2, private elementRef: ElementRef,private router:Router, private route: ActivatedRoute) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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
    this.getallCategorie_Produit();
  }

  load(): void {
    this.httpservice.getById("Compte",this.id).subscribe((response: any) => {
      console.log(response);
      this.compte = response;
      console.log(this.compte);
      
      this.nb=this.compte.length
      this.httpservice.getById("Operation/bycompte",this.compte.id).subscribe((response1: any) => {
        console.log(response1);
        this.operations = response1;
        this.dtTrigger.next(null);
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
    this.httpservice.getAll("Operation").subscribe((response1: any) => {
      console.log(response1);
      this.nb1 = response1.length;


    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  onSubmit(form: NgForm): void {
    const { du_date, au_date } = form.value; // Accédez aux valeurs soumises par le formulaire
  
    if (du_date && au_date) {
      this.operations=[]
      this.httpservice.getoperationBetweenDates(du_date, au_date).subscribe(
        (data) => {
          console.log('Bons operation récupérés:', data);
          this.operations = data.filter((e: any) => e.compte.id === this.compte.id);
        },
        (error) => {
          console.error('Erreur lors de la récupération des bons d\'entrée:', error);
        }
      );
    } else {
      console.error('Dates invalides.');
    }
  
    console.log('Valeurs soumises par le formulaire:', form.value);
  }
  edit(id: any) {
    console.log(id);
    
    this.router.navigateByUrl("/admin/produit/compte/edit/"+id);
  }

  call_delete_modal(produitId: any) {
    this.produitIdToDelete = produitId; // Update the ID to delete when the modal is opened
    console.log(produitId);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.produitIdToDelete) {
      this.httpservice.delete("auth/users", Number(this.produitIdToDelete)).subscribe(
        (response) => {
          console.log('produitistrateur supprimé avec succès :', this.produitIdToDelete);
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
  ajouteroperation() {
  if(this.newoperation.montant!=0){
    if(this.newoperation.montant<this.compte.solde){
      let op={
        code:'OP_' + (this.nb1 + 1).toString()
        ,
         type:'Débit',
         montant:Number(this.newoperation.montant),
         date:new Date(),
         compte:{
          id:this.id
         }
       }
       console.log(op);
       
       this.httpservice.create("Operation", op).subscribe((response1: any) => {
         console.log(response1);
       
  
      
     let aux1={
      code:this.compte.code,
      dateCreation:this.compte.dateCreation,
      dateDerniereModification:new Date(),
      solde:this.compte.solde-op.montant,
      instructor:{
        id:this.compte.instructor.id
  
      }
  
     }
        this.httpservice.update("Compte", this.compte.id,aux1).subscribe((ruc: any) => {
          console.log(ruc);
          this._success.next("L'opération a été ajouté avec succès.");

      this.ngOnInit()
  
          
        }, (error: any) => {
          alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
        });
         
       }, (error: any) => {
         alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
       });
    }else{
      this._erreur.next("Le solde du compte est insuffisant !");

    }
  }else
  this._erreur.next("saisir un montant!");

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
