import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-vente-prods',
  templateUrl: './vente-prods.component.html',
  styleUrls: ['./vente-prods.component.css']
})
export class VenteProdsComponent {
  private _success = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  dates = { startDate: '2024-04-01', endDate: '2024-04-30' };
  tab:any=[]
  tab1:any=[]
  bonentre: any={};
  nb:number=0
  nb1:number=0

  bonentreIdToDelete: string = '';
  lingeventeIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
   dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();
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
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
    this.Vente_prodervice.getAll("Vente_prod").subscribe((response: any) => {
      console.log(response);
      this.tab = response;
      this.dtTrigger.next(null);


    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
    this.Vente_prodervice.getAll("Operation").subscribe((response1: any) => {
      console.log(response1);
      this.nb1 = response1.length;


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
          this._success.next("La vente produit a été supprimé avec succès.");

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
  encaisser(id:any){
    this.Vente_prodervice.getById("Vente_prod",id)
    .subscribe((data) => {
      console.log(data);
      let v=data
      this.Vente_prodervice.getById("Compte/byInstructor",data.instructor.id).subscribe((rc: any) => {
        console.log(rc);
     let r = rc;
     let p:any
     this.Vente_prodervice.getById("pourcentages/byCategory",data.instructor.id).subscribe((rp: any) => {
       console.log(rp);
       p = rp;
       let op={
        code:'OP_' + (this.nb1 + 1).toString()
        ,
         type:'credit',
         montant:data.totTtc*(p.pourcentageProduit/100),
         date:new Date(),
         compte:{
          id:r.id
         }
       }
       this.Vente_prodervice.create("Operation", op).subscribe((response1: any) => {
         console.log(response1);
         console.log(v);
         let aux={
          code:v.code,
          dateVente:v.dateVente,
          totHt:v.totHt,
          totTtc:v.totTtc,
          instructor:{
            id:v.instructor.id
          },
          encaisse:true
         }
         console.log(aux);

         this.Vente_prodervice.update("Vente_prod", id,aux).subscribe((ruv: any) => {
          console.log(ruv);
          
      
  
          
        }, (error: any) => {
          alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
        });
     let aux1={
      code:r.code,
      dateCreation:r.dateCreation,
      dateDerniereModification:new Date(),
      solde:r.solde+op.montant,
      instructor:{
        id:r.instructor.id
  
      }
     }
        this.Vente_prodervice.update("Compte", r.id,aux1).subscribe((ruc: any) => {
          console.log(ruc);
          this._success.next("L'encaissement a été ajouté avec succès.");
          this.ngOnInit()
    
  
          
        }, (error: any) => {
          alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
        });
         
       }, (error: any) => {
         alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
       });
     }, (error: any) => {
       console.error('Erreur lors de la récupération des données:', error);
     });
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    });
  }
}