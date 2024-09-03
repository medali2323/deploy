import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-list-compte',
  templateUrl: './list-compte.component.html',
  styleUrls: ['./list-compte.component.css']
})
export class ListCompteComponent {

  compte: any[] = [];
  editdata:any
  nouveaucompte: any = { description: '',code:'' };
  nb:number=0
  compteIdToDelete: string = '';
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
    constructor(private httpservice: HttpService, private modalService: NgbModal, private route:Router) {}
  
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
    showConfirmationModal = true; // Change this based on your logic
    fullName: string = ''; // Property to bind to the input field
    load(): void {
  
      this.httpservice.getAll("Compte").subscribe((response: any) => {
        console.log(response);
        this.compte = response;
       this.nb=this.compte.length;
       this.dtTrigger.next(null);
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
  
    ajoutercompte(f:NgForm): void {
      // Vérifiez si le champ 'desc' du nouveau compte est vide
      this.nouveaucompte=f.value
     
      
      this.httpservice.create("comptes", this.nouveaucompte).subscribe((response: any) => {
        this.dtOptions={}
        this.dtTrigger=new Subject()
        // Gérez la réponse du service (par exemple, affichez un message de succès)
        this.modalService.dismissAll();
        this.nouveaucompte.desc = ''; // Réinitialisez le champ de description du nouveau compte
        this.ngOnInit()      
        this.nouveaucompte.desc = ''; // Réinitialisez le champ de description du nouveau compte
      }, (error: any) => {
        // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
        alert('Erreur lors de l\'ajout du compte : ' + error.message);
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
    updatecompte(){
      console.log(this.editdata);
      
      this.httpservice.update("comptes",this.editdata.id,this.editdata).subscribe((response: any) => {
        // Gérez la réponse du service (par exemple, affichez un message de succès)
        this.modalService.dismissAll();
        this.nouveaucompte.desc = '';
        this.dtOptions={}
        this.dtTrigger=new Subject()
              this.ngOnInit()
      }, (error: any) => {
        // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
        alert('Erreur lors de l\'edit du compte : ' + error.message);
      });
    }
    call_delete_modal(compteId: any) {
      this.compteIdToDelete = compteId; // Update the ID to delete when the modal is opened
      console.log(compteId);
    }
  
    deletecompte() {
      // Check first that the ID to delete is not empty
      if (this.compteIdToDelete) {
        this.httpservice.delete("comptes", Number(this.compteIdToDelete)).subscribe(
          (response) => {
            console.log('compteistrateur supprimé avec succès :', this.compteIdToDelete);
            this.cancel()
            this.refreshData()
          },
          (error) => {
            console.error('Erreur lors de la suppression de l\'compteistrateur :', error);
            // Handle errors here
          }
        );
      } else {
        console.error('ID de l\'compteistrateur à supprimer non spécifié.');
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
    toopertion(id: any) {
      this.route.navigateByUrl("/admin/comptes/operations/"+id);
    
    }
  }
  