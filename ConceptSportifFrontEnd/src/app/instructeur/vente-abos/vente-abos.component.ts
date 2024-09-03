import { Component, ViewChild } from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-vente-abos',
  templateUrl: './vente-abos.component.html',
  styleUrls: ['./vente-abos.component.css']
})
export class VenteAbosComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  Vente_abonnement: any[] = [];
  editdata:any
  nb:number=0
  Vente_abonnementIdToDelete: string = '';
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
    constructor(private httpservice: HttpService, private modalService: NgbModal) {}
  
    ngOnInit(): void {
   
  
      this.load(); // Appel à la méthode users pour charger les données initiales
    }
  
 
    id=Number(localStorage.getItem("i"))

    load(): void {
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
      this.httpservice.getById("Vente_abonnement/instructor",this.id).subscribe((response: any) => {
        console.log(response);
        this.Vente_abonnement = response;
        this.dtTrigger.next(null);

       this.nb=this.Vente_abonnement.length;
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
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
    call_delete_modal(Vente_abonnementId: any) {
      this.Vente_abonnementIdToDelete = Vente_abonnementId; // Update the ID to delete when the modal is opened
      console.log(Vente_abonnementId);
    }
  
    delete() {
      // Check first that the ID to delete is not empty
      if (this.Vente_abonnementIdToDelete) {
        this.httpservice.delete("Vente_abonnement", Number(this.Vente_abonnementIdToDelete)).subscribe(
          (response) => {
            this._success.next("Le vente abonnement  a été supprimé avec succès.");

            console.log('Vente_abonnementistrateur supprimé avec succès :', this.Vente_abonnementIdToDelete);
            this.load()
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'Vente_abonnementistrateur :', error);
            // Handle errors here
          }
        );
      } else {
        console.error('ID de l\'Vente_abonnementistrateur à supprimer non spécifié.');
        // Handle case where ID to delete is empty
      }
    }
  }
  