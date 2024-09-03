import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  fournisseur: any[] = [];
  editdata:any
  nouveaufournisseur: any = { description: '',code:'' };
  nb:number=0
  fournisseurIdToDelete: string = '';
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
    constructor(private httpservice: HttpService, private modalService: NgbModal) {}
  
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
  
      this.httpservice.getAll("fournisseurs").subscribe((response: any) => {
        console.log(response);
        this.fournisseur = response;
       this.nb=this.fournisseur.length;
       this.dtTrigger.next(null);
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
  
    ajouterfournisseur(f:NgForm): void {
      // Vérifiez si le champ 'desc' du nouveau fournisseur est vide
      this.nouveaufournisseur=f.value
     
      let exist = this.fournisseur.filter((e: any) => e.raisonSociale === this.nouveaufournisseur.raisonSociale||e.matriculeFiscale === this.nouveaufournisseur.matriculeFiscale);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("fournisseur exist");
    this._erreur.next("Le fournisseur existe deja !");

   } else 
      this.httpservice.create("fournisseurs", this.nouveaufournisseur).subscribe((response: any) => {
        this.dtOptions={}
        this.dtTrigger=new Subject()
        // Gérez la réponse du service (par exemple, affichez un message de succès)
        this.modalService.dismissAll();
        this.nouveaufournisseur.desc = ''; // Réinitialisez le champ de description du nouveau fournisseur
        this.ngOnInit()      
        this.nouveaufournisseur.desc = ''; // Réinitialisez le champ de description du nouveau fournisseur
      }, (error: any) => {
        // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
        alert('Erreur lors de l\'ajout du fournisseur : ' + error.message);
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
    updatefournisseur(){
      console.log(this.editdata);
      
      this.httpservice.update("fournisseurs",this.editdata.id,this.editdata).subscribe((response: any) => {
        // Gérez la réponse du service (par exemple, affichez un message de succès)
        this.modalService.dismissAll();
        this.nouveaufournisseur.desc = '';
        this.dtOptions={}
        this.dtTrigger=new Subject()
        this._success.next("Le fournisseur  a été ajouté avec succès.");

              this.ngOnInit()
      }, (error: any) => {
        // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
        alert('Erreur lors de l\'edit du fournisseur : ' + error.message);
      });
    }
    call_delete_modal(fournisseurId: any) {
      this.fournisseurIdToDelete = fournisseurId; // Update the ID to delete when the modal is opened
      console.log(fournisseurId);
    }
  
    deletefournisseur() {
      // Check first that the ID to delete is not empty
      if (this.fournisseurIdToDelete) {
        this.httpservice.delete("fournisseurs", Number(this.fournisseurIdToDelete)).subscribe(
          (response) => {
            console.log('fournisseuristrateur supprimé avec succès :', this.fournisseurIdToDelete);
            this._success.next("Le fournisseur  a été supprimé avec succès.");

            this.cancel()
            this.refreshData()
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'fournisseuristrateur :', error);
            // Handle errors here
          }
        );
      } else {
        console.error('ID de l\'fournisseuristrateur à supprimer non spécifié.');
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
  