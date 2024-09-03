import { Component, ViewChild } from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
@Component({
  selector: 'app-pourcentages',
  templateUrl: './pourcentages.component.html',
  styleUrls: ['./pourcentages.component.css']
})
export class PourcentagesComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  pourcentages: any={};
  adminIdToDelete: string = '';
  editdata:any

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  nouveaupourcentage:any={
    'cat_inst_id':null,
    'pr_client':'',
    'pr_prod':''
  };
  categ_Instructeur:any=[]
  constructor(private httpservice: HttpService, private modalService: NgbModal) {}

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

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
	
    this.getallpourcentages(); 
    this.getallcateg_Instructeur()
  }

  getallpourcentages(): void {
    this.httpservice.getAll("pourcentages").subscribe((response: any) => {
      console.log(response);
      this.pourcentages = response;
      this.dtTrigger.next(null);
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
console.log(this.editdata);

 
  }
  edit(f: any) {
    let aux={
      id:this.editdata.id,
      pourcentageClient:Number(this.editdata.pourcentageClient),
      pourcentageProduit:Number(this.editdata.pourcentageProduit),
      pourcentageFormation:Number(this.editdata.pourcentageFormation),
      categoriesInstructeurs:{
        id:Number(this.editdata.categoriesInstructeurs.id)
      }}
    // Add logic for editing an admin
    console.log(aux);
    
    this.httpservice.update("pourcentages",this.editdata.id,aux).subscribe(
      (response) => {
        console.log('Administrateur supprimé avec succès :', this.adminIdToDelete);
        this._success.next("La pourcentage  a été Modifié avec succès.");
        this.modalService.dismissAll();

        this.pourcentages()
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'administrateur :', error);
        // Handle errors here
      }
    );
  }

  call_delete_modal(adminId: any) {
    this.adminIdToDelete = adminId; // Update the ID to delete when the modal is opened
    console.log(adminId);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.adminIdToDelete) {
      this.httpservice.delete("pourcentages", Number(this.adminIdToDelete)).subscribe(
        (response) => {
          console.log('Administrateur supprimé avec succès :', this.adminIdToDelete);
          this._success.next("La pourcentage  a été supprimée avec succès.");

          this.pourcentages()
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'administrateur :', error);
          // Handle errors here
        }
      );
    } else {
      console.error('ID de l\'administrateur à supprimer non spécifié.');
      // Handle case where ID to delete is empty
    }
  }
  ajouterpourcentage() {
    
    let aux={
      pourcentageClient:Number(this.nouveaupourcentage.pr_client),
      pourcentageProduit:Number(this.nouveaupourcentage.pr_prod),
      pourcentageFormation:Number(this.nouveaupourcentage.pr_formation),
      categoriesInstructeurs:{
        id:Number(this.nouveaupourcentage.cat_inst_id)
      }
    }
    let exist = this.pourcentages.filter((e: any) => e.pourcentageClient === aux.pourcentageClient&&e.pourcentageProduit === aux.pourcentageProduit&&e.pourcentageFormation === aux.pourcentageFormation&&e.categoriesInstructeurs.id===aux.categoriesInstructeurs.id);
    if (exist.length>0) {     console.log("pourcentages exist");
    this._erreur.next("La pourcentage existe deja !");

    } else{
        this.httpservice.create("pourcentages", aux).subscribe((response: any) => {
      console.log(response); // Affichez la réponse du backend dans la console
      // Ajoutez ici d'autres actions à effectuer après la création réussie des données
      this._success.next("La pourcentage  a été ajoutée avec succès.");

      this.ngOnInit()
    }, (error: any) => {
      console.error('Erreur lors de la création des données:', error); // Gérez les erreurs
    });
    }
  
  }
  getallcateg_Instructeur(): void {
    this.httpservice.getAll("categ_Instructeur").subscribe((response: any) => {
      console.log(response);
      
      this.categ_Instructeur = response;
   
    });
  }
}
