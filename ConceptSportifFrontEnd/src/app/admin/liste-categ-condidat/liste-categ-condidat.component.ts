import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-liste-categ-condidat',
  templateUrl: './liste-categ-condidat.component.html',
  styleUrls: ['./liste-categ-condidat.component.css']
})
export class ListeCategCondidatComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  

  CategCondidat: any[] = [];
editdata:any
nouveauCategCondidat: any = { code: '',descriptionarcond:'' ,duree:0};
nb:number=0
CategCondidatIdToDelete: string = '';

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
    this.httpservice.getAll("CategCondidat").subscribe((response: any) => {
      console.log(response);
      this.CategCondidat = response;
     this.nb=this.CategCondidat.length;
     this.dtTrigger.next(null);

    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }

  ajouterCategCondidat(f: NgForm): void {
    // Vérifiez si le champ 'descriptionarcond' du nouveau CategCondidat est vide
    const nouveauCategCondidat = { descriptionarcond: f.value.descriptionarcond.trim(),codecatcond:'' };
  
    nouveauCategCondidat.codecatcond = 'CC_' + (this.nb + 1).toString();
      console.log(nouveauCategCondidat);
      let exist = this.CategCondidat.filter((e: any) => e.description === this.nouveauCategCondidat.description);
      console.log(exist.length===0);
      
     if (exist.length>0) {
      console.log("pays exist");
      this._erreur.next("La Catégorie  existe deja !");
  
     } else 
     
    this.httpservice.create("CategCondidat", nouveauCategCondidat).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.modalService.dismissAll();
      this.dtOptions={}
      this.dtTrigger=new Subject()
      f.resetForm(); // Réinitialisez le formulaire
      this._success.next("La Catégorie  a été ajoutée avec succès.");

      this.ngOnInit();      
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'ajout du CategCondidat : ' + error.message);
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
  updateCategCondidat(){
    console.log(this.editdata);
    
    this.httpservice.update("CategCondidat",this.editdata.id,this.editdata).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.modalService.dismissAll();
      this.nouveauCategCondidat.desc = ''; // Réinitialisez le champ de description du nouveau CategCondidat
      this._success.next("La Catégorie  a été modifiée avec succès.");

      this.ngOnInit()
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'edit du CategCondidat : ' + error.message);
    });
  }
  call_delete_modal(CategCondidatId: any) {
    this.CategCondidatIdToDelete = CategCondidatId; // Update the ID to delete when the modal is opened
    console.log(CategCondidatId);
  }

  deleteCategCondidat() {
    // Check first that the ID to delete is not empty
    if (this.CategCondidatIdToDelete) {
      this.httpservice.delete("CategCondidat", Number(this.CategCondidatIdToDelete)).subscribe(
        (response) => {
          this.dtOptions={}
      this.dtTrigger=new Subject()
          console.log('CategCondidatistrateur supprimé avec succès :', this.CategCondidatIdToDelete);
          this.modalService.dismissAll();
          this._success.next("La Catégorie  a été supprimée avec succès.");

          this.ngOnInit()
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'CategCondidatistrateur :', error);
          // Handle errors here
        }
      );
    } else {
      console.error('ID de l\'CategCondidatistrateur à supprimer non spécifié.');
      // Handle case where ID to delete is empty
    }
  }
}
