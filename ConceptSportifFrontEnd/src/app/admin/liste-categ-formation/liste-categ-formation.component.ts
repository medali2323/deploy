import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-liste-categ-formation',
  templateUrl: './liste-categ-formation.component.html',
  styleUrls: ['./liste-categ-formation.component.css']
})
export class ListeCategFormationComponent {

  CategFormation: any[] = [];
editdata:any
nouveauCategFormation: any = { code: '',lib:'' ,duree:0};
nb:number=0
CategFormationIdToDelete: string = '';

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


    this.load(); // Appel à la méthode users pour charger les données initiales
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    $('#table').DataTable().destroy(); // Destroy DataTable instance
  }

  load(): void {
    this.httpservice.getAll("categFormation").subscribe((response: any) => {
      console.log(response);
      this.CategFormation = response;
     this.nb=this.CategFormation.length;
     this.dtTrigger.next(null);

    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }

  ajouterCategFormation(f: NgForm): void {
    // Vérifiez si le champ 'lib' du nouveau CategFormation est vide
    const nouveauCategFormation = { lib: f.value.lib.trim(), duree: f.value.duree.trim(),code:'' };
    if (!nouveauCategFormation.lib) {
      alert('Veuillez entrer le nom du CategFormation.');
      return;
    }
    nouveauCategFormation.code = 'CF_' + (this.nb + 1).toString();
      console.log(nouveauCategFormation);
      
    this.httpservice.create("categFormation", nouveauCategFormation).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.modalService.dismissAll();
      this.dtOptions={}
      this.dtTrigger=new Subject()
      f.resetForm(); // Réinitialisez le formulaire
      this.ngOnInit();      
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'ajout du CategFormation : ' + error.message);
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
  updateCategFormation(){
    console.log(this.editdata);
    
    this.httpservice.update("categFormation",this.editdata.id,this.editdata).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.modalService.dismissAll();
      this.nouveauCategFormation.desc = ''; // Réinitialisez le champ de description du nouveau CategFormation
      this.ngOnInit()
    }, (error: any) => {
      // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
      alert('Erreur lors de l\'edit du CategFormation : ' + error.message);
    });
  }
  call_delete_modal(CategFormationId: any) {
    this.CategFormationIdToDelete = CategFormationId; // Update the ID to delete when the modal is opened
    console.log(CategFormationId);
  }

  deleteCategFormation() {
    // Check first that the ID to delete is not empty
    if (this.CategFormationIdToDelete) {
      this.httpservice.delete("categFormation", Number(this.CategFormationIdToDelete)).subscribe(
        (response) => {
          this.dtOptions={}
      this.dtTrigger=new Subject()
          console.log('CategFormationistrateur supprimé avec succès :', this.CategFormationIdToDelete);
          this.modalService.dismissAll();

          this.ngOnInit()
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'CategFormationistrateur :', error);
          // Handle errors here
        }
      );
    } else {
      console.error('ID de l\'CategFormationistrateur à supprimer non spécifié.');
      // Handle case where ID to delete is empty
    }
  }
  
}
