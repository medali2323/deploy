import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-vente-prods',
  templateUrl: './vente-prods.component.html',
  styleUrls: ['./vente-prods.component.css']
})
export class VenteProdsComponent {
  dates = { startDate: '2024-04-01', endDate: '2024-04-30' };
  tab:any=[]
  tab1:any=[]
  bonentre: any={};
  nb:number=0
  bonentreIdToDelete: string = '';
  lingeventeIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
   dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();
  id=Number(localStorage.getItem("i"))

  constructor(private Vente_prodervice: HttpService, private datePipe: DatePipe,private router:Router) {}
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
  
    this.Vente_prodervice.getById("Vente_prod/instructor", this.id).subscribe((response: any) => {
      console.log(response);
      this.tab = response;
      this.dtTrigger.next(null);


    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }

  fillTable(id:any){
    this.dtOptions1 = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: false,
      language: {
        searchPlaceholder: 'Text Customer'
      },
      dom: 'Bfrtip',
     
    };
    this.tab1=[]
    this.Vente_prodervice.getById("Lignevente/byvebteprod",id).subscribe((response: any) => {
      console.log(response);
      this.tab1 = response;
      this.dtTrigger1.next(null);


    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }






  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["/admin/produit/produits/edit/", id]);
  }
  call_delete_modal(id: any) {
    this.bonentreIdToDelete = id; // Update the ID to delete when the modal is opened
    console.log(this.bonentreIdToDelete);
  }
  call_delete_modal2(id: any) {
    this.lingeventeIdToDelete = id; // Update the ID to delete when the modal is opened
    console.log(this.lingeventeIdToDelete);
  }
 
  delete() {
    // Check first that the ID to delete is not empty
    if (this.bonentreIdToDelete) {
      this.Vente_prodervice.delete("Vente_prod", Number(this.bonentreIdToDelete)).subscribe(
        (response) => {
          console.log('Bonentre supprimé avec succès :', this.bonentreIdToDelete);
          this.ngOnInit()  ;    
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
  delete2() {
    // Check first that the ID to delete is not empty
    console.log(this.lingeventeIdToDelete);
    
    if (this.lingeventeIdToDelete) {
      this.Vente_prodervice.delete("Lignevente", Number(this.lingeventeIdToDelete)).subscribe(
        (response) => {
          console.log('Bonentre supprimé avec succès :', this.lingeventeIdToDelete );
          this.removeRowl(this.lingeventeIdToDelete)
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
  removeRow(id:any){
    this.tab = this.tab.filter((item: any) => !item.id===id);

  }
  removeRowl(id:any){
    this.tab1 = this.tab1.filter((item: any) => !item.id===id);

  }
}