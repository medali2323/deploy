import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-list-stock',
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.css']
})
export class ListStockComponent {
  produits: any[] = [];
  editdata:any
  nouveauproduits: any = { description: '',code:'' };
  nb:number=0
  produitsIdToDelete: string = '';
  
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
    showConfirmationModal = true; // Change this based on your logic
    fullName: string = ''; // Property to bind to the input field
    load(): void {
      this.httpservice.getAll("Produit",).subscribe((response: any) => {
        console.log(response);
        this.produits = response;
       this.nb=this.produits.length;
       this.dtTrigger.next(null);
        this.produits.forEach(e => {
          this.httpservice.getById("Produit/stock",e.id).subscribe((response1: any) => {
            console.log(response1);
            e.qte = response1;
         
      
          }, (error: any) => {
            console.error('Erreur lors de la récupération des données:', error);
          });
        });
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    
    }
  
  
  }
  