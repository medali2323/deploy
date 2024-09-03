import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';



@Component({
  selector: 'app-liste-categ-abonnements',
  templateUrl: './liste-categ-abonnements.component.html',
  styleUrls: ['./liste-categ-abonnements.component.css']
})
export class ListeCategAbonnementsComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  categ_abonnement: any[] = [];
  editdata:any
  nouveaucateg_abonnement: any = { description: '',code:'' };
  nb:number=0
  categ_abonnementIdToDelete: string = '';
  
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
  
    load(): void {
   
         this.httpservice.getAll("categ_abonnement").subscribe((response: any) => {
        console.log(response);
        this.categ_abonnement = response;
       this.nb=this.categ_abonnement.length;
       this.dtTrigger.next(null);
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
  
   
    ajoutercateg_abonnement(f:NgForm): void {
      // Vérifiez si le champ 'desc' du nouveau pays est vide
      this.nouveaucateg_abonnement=f.value
      if (!this.nouveaucateg_abonnement.description.trim()) {
        alert('Veuillez entrer le nom du categ_abonnement.');
        return;
      }
      this.nouveaucateg_abonnement.code = 'CA_' + (this.nb + 1).toString();
      let exist = this.categ_abonnement.filter((e: any) => e.description === this.nouveaucateg_abonnement.description);
      console.log(exist.length===0);
      
     if (exist.length>0) {
      console.log("pays exist");
      this._erreur.next("La Catégorie existe deja !");
  
     } else 
      this.httpservice.create("categ_abonnement", this.nouveaucateg_abonnement).subscribe((response: any) => {
        // Gérez la réponse du service (par exemple, affichez un message de succès)
        this.modalService.dismissAll();
        this.dtOptions={}
        this.dtTrigger=new Subject()
        this._success.next("La Catégorie a été ajoutée avec succès.");

      this.ngOnInit();
      }, (error: any) => {
        // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
        alert('Erreur lors de l\'ajout du pays : ' + error.message);
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
    updatecateg_abonnement(){
      console.log(this.editdata);
      
      this.httpservice.update("categ_abonnement",this.editdata.id,this.editdata).subscribe((response: any) => {
        // Gérez la réponse du service (par exemple, affichez un message de succès)
        this.modalService.dismissAll();
        this.nouveaucateg_abonnement.desc = ''; // Réinitialisez le champ de description du nouveau categ_abonnement
        this._success.next("La Catégorie a été modifiée avec succès.");

        this.ngOnInit()
      }, (error: any) => {
        // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
        alert('Erreur lors de l\'edit du categ_abonnement : ' + error.message);
      });
    }
    call_delete_modal(categ_abonnementId: any) {
      this.categ_abonnementIdToDelete = categ_abonnementId; // Update the ID to delete when the modal is opened
      console.log(categ_abonnementId);
    }
  
    deletecateg_abonnement() {
      // Check first that the ID to delete is not empty
      if (this.categ_abonnementIdToDelete) {
        this.httpservice.delete("categ_abonnement", Number(this.categ_abonnementIdToDelete)).subscribe(
          (response) => {
            console.log('categ_abonnementistrateur supprimé avec succès :', this.categ_abonnementIdToDelete);
            this.modalService.dismissAll();
            this._success.next("La Catégorie a été supprimé avec succès.");

            this.ngOnInit()
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'categ_abonnementistrateur :', error);
            // Handle errors here
          }
        );
      } else {
        console.error('ID de l\'categ_abonnementistrateur à supprimer non spécifié.');
        // Handle case where ID to delete is empty
      }
    }
  }
  