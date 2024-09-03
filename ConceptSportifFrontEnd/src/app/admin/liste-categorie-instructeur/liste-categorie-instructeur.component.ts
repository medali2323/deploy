import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-liste-categorie-instructeur',
  templateUrl: './liste-categorie-instructeur.component.html',
  styleUrls: ['./liste-categorie-instructeur.component.css']
})
export class ListeCategorieInstructeurComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  categ_Instructeur: any[] = [];
editdata:any
nouveaucateg_Instructeur: any = { description: '',code:'' };
nb:number=0
categ_InstructeurIdToDelete: string = '';

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
    
    this.httpservice.getAll("categ_Instructeur").subscribe((response: any) => {
      console.log(response);
      this.categ_Instructeur = response;
     this.nb=this.categ_Instructeur.length;
     this.dtTrigger.next(null);

    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }

  ajoutercateg_Instructeur(f:NgForm): void {
    // Vérifiez si le champ 'desc' du nouveau pays est vide
    this.nouveaucateg_Instructeur=f.value
    if (!this.nouveaucateg_Instructeur.description.trim()) {
      alert('Veuillez entrer le nom du categ_Instructeur.');
      return;
    }
    this.nouveaucateg_Instructeur.code = 'CI_' + (this.nb + 1).toString();

	 
    let exist = this.categ_Instructeur.filter((e: any) => e.description === this.nouveaucateg_Instructeur.description);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("pays exist");
    this._erreur.next("La  Catégorie instructeur existe deja !");

   } else 
    this.httpservice.create("categ_Instructeur", this.nouveaucateg_Instructeur).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.modalService.dismissAll();
      this.dtOptions={}
      this.dtTrigger=new Subject()
      this.nouveaucateg_Instructeur.desc = ''; // Réinitialisez le champ de description du nouveau categ_Instructeur
      this._success.next("La  Catégorie instructeur  a été ajoutée avec succès.");

      this.ngOnInit()      
      this.nouveaucateg_Instructeur.desc = ''; // Réinitialisez le champ de description du nouveau categ_Instructeur
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'ajout du categ_Instructeur : ' + error.message);
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
  updatecateg_Instructeur(){
    console.log(this.editdata);
    
    this.httpservice.update("categ_Instructeur",this.editdata.id,this.editdata).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this._success.next("La  Catégorie instructeur   a été Modifiée avec succès.");

      this.modalService.dismissAll();
      this.nouveaucateg_Instructeur.desc = ''; // Réinitialisez le champ de description du nouveau categ_Instructeur
      this.ngOnInit()
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'edit du categ_Instructeur : ' + error.message);
    });
  }
  call_delete_modal(categ_InstructeurId: any) {
    this.categ_InstructeurIdToDelete = categ_InstructeurId; // Update the ID to delete when the modal is opened
    console.log(categ_InstructeurId);
  }

  deletecateg_Instructeur() {
    // Check first that the ID to delete is not empty
    if (this.categ_InstructeurIdToDelete) {
      this.httpservice.delete("categ_Instructeur", Number(this.categ_InstructeurIdToDelete)).subscribe(
        (response) => {
          console.log('categ_Instructeuristrateur supprimée avec succès :', this.categ_InstructeurIdToDelete);
          this.modalService.dismissAll();
          this._success.next("La  Catégorie instructeur a été supprimée avec succès.");

          this.ngOnInit()
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'categ_Instructeuristrateur :', error);
          // Handle errors here
        }
      );
    } else {
      console.error('ID de l\'categ_Instructeuristrateur à supprimer non spécifié.');
      // Handle case where ID to delete is empty
    }
  }
}
