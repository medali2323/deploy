import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-liste-categ-evenement',
  templateUrl: './liste-categ-evenement.component.html',
  styleUrls: ['./liste-categ-evenement.component.css']
})
export class ListeCategEvenementComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  
  dtOptions: DataTables.Settings = {};
dtTrigger:Subject<any>=new Subject<any>();
  Type_evenement: any[] = [];
editdata:any
nouveauType_evenement: any = { description: '',code:'' };
nbType_evenement:number=0
Type_evenementIdToDelete:string=''
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
    this.httpservice.getAll("Type_evenement").subscribe((response: any) => {
      console.log(response);
      this.Type_evenement = response;
      this.nbType_evenement=this.Type_evenement.length;
      this.dtTrigger.next(null);

    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  ajouterType_evenement(f:NgForm): void {
    // Vérifiez si le champ 'desc' du nouveau Type_evenement est vide
    this.nouveauType_evenement=f.value
    if (!this.nouveauType_evenement.description.trim()) {
      alert('Veuillez entrer le nom du Type_evenement.');
      return;
    }
    let exist = this.Type_evenement.filter((e: any) => e.description === this.nouveauType_evenement.description);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("pays exist");
    this._erreur.next("Le Type evenement existe deja !");

   } else 
    this.httpservice.create("Type_evenement", this.nouveauType_evenement).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.modalService.dismissAll();
      this.nouveauType_evenement.desc = ''; // Réinitialisez le champ de description du nouveau Type_evenement
      this._success.next("Le Type evenement  a été ajouté avec succès.");

      this.ngOnInit()      
      this.nouveauType_evenement.desc = ''; // Réinitialisez le champ de description du nouveau Type_evenement
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'ajout du Type_evenement : ' + error.message);
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
  call_delete_modal(Type_evenementId: any) {
    this.Type_evenementIdToDelete = Type_evenementId; // Update the ID to delete when the modal is opened
    console.log(Type_evenementId);
  }

  deleteType_evenement() {
    // Check first that the ID to delete is not empty
    if (this.Type_evenementIdToDelete) {
      this.httpservice.delete("Type_evenement", Number(this.Type_evenementIdToDelete)).subscribe(
        (response) => {
          console.log('Type_evenementistrateur supprimé avec succès :', this.Type_evenementIdToDelete);
          this.modalService.dismissAll();
         
          this.ngOnInit()
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'Type_evenementistrateur :', error);
          // Handle errors here
        }
      );
    } else {
      console.error('ID de l\'Type_evenementistrateur à supprimer non spécifié.');
      // Handle case where ID to delete is empty
    }
  }
  updatetypeevenement(){
    console.log(this.editdata);
    
    this.httpservice.update("Type_evenement",this.editdata.id,this.editdata).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.modalService.dismissAll();
      this.dtOptions={}
      this.dtTrigger=new Subject()
      this._success.next("Le Type evenement  a été Modifié avec succès.");
   
      this.ngOnInit()
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'edit du pays : ' + error.message);
    });
  }
}
