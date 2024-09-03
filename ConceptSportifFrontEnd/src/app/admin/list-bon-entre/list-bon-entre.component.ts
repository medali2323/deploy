import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-list-bon-entre',
  templateUrl: './list-bon-entre.component.html',
  styleUrls: ['./list-bon-entre.component.css']
})
export class ListBonEntreComponent  implements OnInit{
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  dates = { startDate: '2024-04-01', endDate: '2024-04-30' };
  tab:any=[]
  tab1:any=[]
  bonentre: any={};
  nb:number=0
  bonentreIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions1: DataTables.Settings = {};
  dtTrigger1: Subject<any> = new Subject<any>();
  constructor(private bonEntreeService: HttpService, private datePipe: DatePipe,private router:Router) {}
  ngOnInit(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
    this._erreur.subscribe(message => this.erreurMessage = message);
    this._erreur.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: false,
      language: {
        searchPlaceholder: 'Text Customer'
      },
      dom: 'Bfrtip',
     
    };
    this.bonEntreeService.getAll("bonentrees").subscribe((response: any) => {
      console.log(response);
      this.tab = response;
      this.dtTrigger.next(null);


    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  onSubmit(form: NgForm): void {
    const { du_date, au_date } = form.value; // Accédez aux valeurs soumises par le formulaire
  
    if (du_date && au_date) {
      this.tab=[]
      this.bonEntreeService.getBonEntreesBetweenDates(du_date, au_date).subscribe(
        (bonsEntrees) => {
          console.log('Bons d\'entrée récupérés:', bonsEntrees);
          this.tab = bonsEntrees;
        },
        (error) => {
          console.error('Erreur lors de la récupération des bons d\'entrée:', error);
        }
      );
    } else {
      console.error('Dates invalides.');
    }
  
    console.log('Valeurs soumises par le formulaire:', form.value);
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
    this.bonEntreeService.getById("LigneProduits/byBonEntree",id).subscribe((response: any) => {
      console.log(response);
      this.tab1 = response;
      this.dtTrigger1.next(null);


    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }






  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["admin/stock-vente/bon_entre/edit", id]);
  }
  call_delete_modal(id: any) {
    this.bonentreIdToDelete = id; // Update the ID to delete when the modal is opened
    console.log(this.bonentreIdToDelete);
  }
  call_delete_modal2(id: any) {
    this.bonentreIdToDelete = id; // Update the ID to delete when the modal is opened
    console.log(this.bonentreIdToDelete);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.bonentreIdToDelete) {
      this.bonEntreeService.delete("bonentrees", Number(this.bonentreIdToDelete)).subscribe(
        (response) => {
          console.log('Bonentre supprimé avec succès :', this.bonentreIdToDelete);
          this._success.next("Le bon d'entré  a été supprimé avec succès.");

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
  deletel() {
    // Check first that the ID to delete is not empty
    if (this.bonentreIdToDelete) {
      this.bonEntreeService.delete("LigneProduits", Number(this.bonentreIdToDelete)).subscribe(
        (response) => {
          console.log('Bonentre supprimé avec succès :', this.bonentreIdToDelete);
          this._success.next("Le bon d'entré  a été supprimé avec succès.");

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
}