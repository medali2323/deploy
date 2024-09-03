import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-liste-categ-cours',
  templateUrl: './liste-categ-cours.component.html',
  styleUrls: ['./liste-categ-cours.component.css']
})
export class ListeCategCoursComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  
  categorie_cours: any[] = [];
  editdata:any
  nouveaucategorie_cours: any = { description: '',code:'' };
  nb:number=0
  categorie_coursIdToDelete: string = '';
  
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
   
         this.httpservice.getAll("Categorie_cours").subscribe((response: any) => {
        console.log(response);
        this.categorie_cours = response;
       this.nb=this.categorie_cours.length;
       this.dtTrigger.next(null);
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
  
   
    ajoutercategorie_cours(f:NgForm): void {
      console.log("gythbgrvfethngrf");
      
      // Vérifiez si le champ 'desc' du nouveau pays est vide
      this.nouveaucategorie_cours=f.value
      if (!this.nouveaucategorie_cours.description.trim()) {
        alert('Veuillez entrer le nom du categorie_cours.');
        return;
      }
      this.nouveaucategorie_cours.code = 'CC_' + (this.nb + 1).toString();

      let exist = this.categorie_cours.filter((e: any) => e.description === this.nouveaucategorie_cours.description);
      console.log(exist.length===0);
      
     if (exist.length>0) {
      console.log("Categorie_cours exist");
      this._erreur.next("La Categorie cours existe deja !");
  
     } else 
      this.httpservice.create("Categorie_cours", this.nouveaucategorie_cours).subscribe((response: any) => {
        // Gérez la réponse du service (par exemple, affichez un message de succès)
        this.modalService.dismissAll();
        this.dtOptions={}
        this.dtTrigger=new Subject()
        this._success.next("La Categorie cours a été ajoutée avec succès.");

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
    updatecategorie_cours(){
      console.log(this.editdata);
      
      this.httpservice.update("Categorie_cours",this.editdata.id,this.editdata).subscribe((response: any) => {
        // Gérez la réponse du service (par exemple, affichez un message de succès)
        this.modalService.dismissAll();
        this.nouveaucategorie_cours.desc = ''; // Réinitialisez le champ de description du nouveau categorie_cours
        this._success.next("La Categorie cours a été modifiée avec succès.");

        this.ngOnInit()
      }, (error: any) => {
        // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
        alert('Erreur lors de l\'edit du categorie_cours : ' + error.message);
      });
    }
    call_delete_modal(categorie_coursId: any) {
      this.categorie_coursIdToDelete = categorie_coursId; // Update the ID to delete when the modal is opened
      console.log(categorie_coursId);
    }
  
    deletecategorie_cours() {
      // Check first that the ID to delete is not empty
      if (this.categorie_coursIdToDelete) {
        this.httpservice.delete("Categorie_cours", Number(this.categorie_coursIdToDelete)).subscribe(
          (response) => {
            console.log('categorie_coursistrateur supprimé avec succès :', this.categorie_coursIdToDelete);
            this.modalService.dismissAll();
            this._success.next("La Categorie cours a été supprimée avec succès.");

            this.ngOnInit()
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'categorie_coursistrateur :', error);
            // Handle errors here
          }
        );
      } else {
        console.error('ID de l\'categorie_coursistrateur à supprimer non spécifié.');
        // Handle case where ID to delete is empty
      }
    }
  }
  