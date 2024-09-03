import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-liste-categorie-representant',
  templateUrl: './liste-categorie-representant.component.html',
  styleUrls: ['./liste-categorie-representant.component.css']
})
export class ListeCategorieRepresentantComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  categorie_representant: any[] = [];
editdata:any
categorie_representantIdToDelete:string=''
nouveaucategorie_representant: any = { description: '',code:'' };
nbcategorie_representant:number=0
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
	
	
    this.load();
  }

  ngOnDestroy(): void {
  }

  load(): void {
    this.httpservice.getAll("categorie_representant").subscribe((response: any) => {
      console.log(response);
      this.categorie_representant = response;
      this.nbcategorie_representant=this.categorie_representant.length;
      this.dtTrigger.next(null);

    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }


  ajoutercategorie_representant(f:NgForm): void {
    // Vérifiez si le champ 'desc' du nouveau categorie_representant est vide
    this.nouveaucategorie_representant=f.value
    if (!this.nouveaucategorie_representant.description.trim()) {
      alert('Veuillez entrer le nom du categorie_representant.');
      return;
    }
    this.nouveaucategorie_representant.code = 'CR_' + (this.nbcategorie_representant + 1).toString();
    let exist = this.categorie_representant.filter((e: any) => e.description === this.nouveaucategorie_representant.description);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("pays exist");
    this._erreur.next("La  Catégorie représantant existe deja !");

   } else 
    this.httpservice.create("categorie_representant", this.nouveaucategorie_representant).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.modalService.dismissAll();
      this.dtOptions={}
      this.dtTrigger=new Subject()
      this.nouveaucategorie_representant.desc = ''; // Réinitialisez le champ de description du nouveau categorie_representant
      this._success.next("La  Catégorie représantant  a été ajoutée avec succès.");

      this.ngOnInit()      
      this.nouveaucategorie_representant.desc = ''; // Réinitialisez le champ de description du nouveau categorie_representant
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
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
  call_delete_modal(categorie_representantId: any) {
    this.categorie_representantIdToDelete = categorie_representantId; // Update the ID to delete when the modal is opened
    console.log(categorie_representantId);
  }

  deletecategorie_representant() {
    // Check first that the ID to delete is not empty
    if (this.categorie_representantIdToDelete) {
      this.httpservice.delete("categorie_representant", Number(this.categorie_representantIdToDelete)).subscribe(
        (response) => {
          this.dtOptions={}
      this.dtTrigger=new Subject()
          console.log('categorie_representantistrateur supprimé avec succès :', this.categorie_representantIdToDelete);
          this.modalService.dismissAll();
          this._success.next("La  Catégorie représantant  a été supprimée avec succès.");

          this.ngOnInit()
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'categorie_representantistrateur :', error);
          // Handle errors here
        }
      );
    } else {
      console.error('ID de l\'categorie_representantistrateur à supprimer non spécifié.');
      // Handle case where ID to delete is empty
    }
  }
}

