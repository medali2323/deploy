import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { AlertService } from 'src/app/servises/alert.service';



@Component({
  selector: 'app-liste-pays',
  templateUrl: './liste-pays.component.html',
  styleUrls: ['./liste-pays.component.css']
})
export class ListePaysComponent implements OnInit, OnDestroy {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''

  pays: any[] = [];
editdata:any
nouveauPays: any = { description: '',code:'' };
nb:number=0
paysIdToDelete: string = '';

dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject<any>();
  constructor(private httpservice: HttpService, private modalService: NgbModal,private alertService: AlertService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: false,
      language: {
        searchPlaceholder: 'Recherche'
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
    this.dtTrigger.unsubscribe();
    $('#table').DataTable().destroy(); // Destroy DataTable instance
  }
  showConfirmationModal = true; // Change this based on your logic
  fullName: string = ''; // Property to bind to the input field
  load(): void {

    this.httpservice.getAll("Pays").subscribe((response: any) => {
      console.log(response);
      this.pays = response;
     this.nb=this.pays.length;
     this.dtTrigger.next(null);

    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }

  ajouterPays(f:NgForm): void {
    // Vérifiez si le champ 'desc' du nouveau pays est vide
    this.nouveauPays=f.value
    if (!this.nouveauPays.description.trim()) {
      alert('Veuillez entrer le nom du pays.');
      return;
    }
    
    let exist = this.pays.filter((e: any) => e.description === this.nouveauPays.description);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("pays exist");
    this._erreur.next("Le pays existe deja !");

   } else {
    this.nouveauPays.code='PY_'+(this.nb+1).toString(),

    this.httpservice.create("Pays", this.nouveauPays).subscribe((response: any) => {
      this.dtOptions={}
      this.dtTrigger=new Subject()
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.modalService.dismissAll();
      this.nouveauPays.description = ''; // Réinitialisez le champ de description du nouveau pays
   //   this.alertService.showSuccessMessage("Le pays a été ajouté avec succès.");
      this._success.next("Le pays  a été ajouté avec succès.");

      this.ngOnInit()      
      this.nouveauPays.desc = ''; // Réinitialisez le champ de description du nouveau pays
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'ajout du pays : ' + error.message);
    });
   }
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
  updatepays(){
    console.log(this.editdata);
    
    this.httpservice.update("Pays",this.editdata.id,this.editdata).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.modalService.dismissAll();
      this.nouveauPays.desc = '';
      this.dtOptions={}
      this.dtTrigger=new Subject()
      this._success.next("Le pays  a été Modifié avec succès.");
   
      this.ngOnInit()
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'edit du pays : ' + error.message);
    });
  }
  call_delete_modal(paysId: any) {
    this.paysIdToDelete = paysId; // Update the ID to delete when the modal is opened
    console.log(paysId);
  }

  deletepays() {
    // Check first that the ID to delete is not empty
    if (this.paysIdToDelete) {
      this.httpservice.delete("Pays", Number(this.paysIdToDelete)).subscribe(
        (response) => {
          this._success.next("Le pays  a été supprimé avec succès.");

          console.log('paysistrateur supprimé avec succès :', this.paysIdToDelete);
          this.cancel()
          this.refreshData()
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'paysistrateur :', error);
          // Handle errors here
        }
      );
    } else {
      console.error('ID de l\'paysistrateur à supprimer non spécifié.');
      // Handle case where ID to delete is empty
    }
  }
  cancel() {
    this.showConfirmationModal = false; // Hide the modal on cancel
  }
  refreshData() {
    this.dtOptions={}
    this.dtTrigger=new Subject()
    // Vous pouvez mettre à jour les données ou rafraîchir la vue ici
    this.ngOnInit(); // Appeler ngOnInit pour réinitialiser les données si nécessaire
  }
}
