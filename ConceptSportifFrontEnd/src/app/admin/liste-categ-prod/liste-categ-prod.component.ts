import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-liste-categ-prod',
  templateUrl: './liste-categ-prod.component.html',
  styleUrls: ['./liste-categ-prod.component.css']
})
export class ListeCategProdComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  Categorie_Produit: any[] = [];
editdata:any
nouveauCategorie_Produit: any = { libcateg: '',code:'' };
CategProduitIdToDelete:string=''
nb:number=0
dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject<any>();
  constructor(private httpservice: HttpService, private modalService: NgbModal) {}

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
    this.load(); // Appel à la méthode users pour charger les données initiales
  }

  ngOnDestroy(): void {
  }

  load(): void {
    this.httpservice.getAll("Categorie_Produit").subscribe((response: any) => {
      console.log(response);
      this.Categorie_Produit = response;
     this.nb=this.Categorie_Produit.length;
     this.dtTrigger.next(null);

    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }

  ajouterCategorie_Produit(f: NgForm): void {
    // Vérifiez si le champ 'libcateg' du nouveau Categorie_Produit est vide
    const nouveauCategorie_Produit = { libcateg: f.value.libcateg.trim(),code:'' };
    if (!nouveauCategorie_Produit.libcateg) {
      alert('Veuillez entrer le nom du Categorie_Produit.');
      return;
    }
    nouveauCategorie_Produit.code = 'CA_' + (this.nb + 1).toString();
    let exist = this.Categorie_Produit.filter((e: any) => e.libcateg === this.nouveauCategorie_Produit.libcateg);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("pays exist");
    this._erreur.next("La Categorie Produit existe deja !");

   } else 
    this.httpservice.create("Categorie_Produit", nouveauCategorie_Produit).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this._success.next("La Categorie Produit a été ajouté avec succès.");

      f.resetForm(); // Réinitialisez le formulaire
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'ajout du Categorie_Produit : ' + error.message);
    });
}

  openEdit(targetModal: any, data: any) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
    this.setpopupdata(data)
  }
  setpopupdata(data: any) {
    console.log(data);
    this.editdata = data;

 
  }
  call_delete_modal(CategProduitId: any) {
    this.CategProduitIdToDelete = CategProduitId; // Update the ID to delete when the modal is opened
    console.log(CategProduitId);
  }
  deleteCategProduit() {
    // Check first that the ID to delete is not empty
    if (this.CategProduitIdToDelete) {
      this.httpservice.delete("Categorie_Produit", Number(this.CategProduitIdToDelete)).subscribe(
        (response) => {
          this.dtOptions={}
      this.dtTrigger=new Subject()
          console.log('CategProduitistrateur supprimé avec succès :', this.CategProduitIdToDelete);
          this.modalService.dismissAll();
          this._success.next("La Categorie Produit a été supprimée avec succès.");

          this.ngOnInit()
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'CategProduitistrateur :', error);
          // Handle errors here
        }
      );
    } else {
      console.error('ID de l\'CategProduitistrateur à supprimer non spécifié.');
      // Handle case where ID to delete is empty
    }
  }
  modifierCategorie_Produit(){
    console.log(this.editdata);
    
    this.httpservice.update("Categorie_Produit",this.editdata.id,this.editdata).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.modalService.dismissAll();
      this.dtOptions={}
      this.dtTrigger=new Subject()
      this._success.next("Le Categorie Produit  a été Modifié avec succès.");
   
      this.ngOnInit()
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'edit du pays : ' + error.message);
    });
  }
}

