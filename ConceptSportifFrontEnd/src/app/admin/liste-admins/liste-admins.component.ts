import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/servises/http.service';
import { Subject, debounceTime } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-liste-admins',
  templateUrl: './liste-admins.component.html',
  styleUrls: ['./liste-admins.component.css']
})
export class ListeAdminsComponent implements OnInit, OnDestroy {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  
  admins: any;
  nouveauAdmin:any={}
  adminIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;

  constructor(private httpservice: HttpService, private modalService: NgbModal,private renderer: Renderer2, private elementRef: ElementRef,private router:Router) {}

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
    this.load(); // Call the users method to load initial data
  }

  load(): void {
    
    this.httpservice.getAll("admins").subscribe((response: any) => {
      console.log(response);
      this.admins = response;
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }

  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["/admin/admins/edit/", id]);
  }

  call_delete_modal(adminId: any) {
    this.adminIdToDelete = adminId; // Update the ID to delete when the modal is opened
    console.log(adminId);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.adminIdToDelete) {
      this.httpservice.delete("admins", Number(this.adminIdToDelete)).subscribe(
        (response) => {
          console.log('Administrateur supprimé avec succès :', this.adminIdToDelete);
          this.modalService.dismissAll();
          this.dtOptions={}
          this.dtTrigger=new Subject()
          this._success.next("L'administrateur a été supprimé avec succès.");

          this.load()
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
  submitForm(f: NgForm) {
    if (f.invalid) {
      return;
    }

    const formData = f.value;
 
    let exist = this.admins.filter((e: any) => e.email === this.nouveauAdmin.email);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("pays exist");
    this._erreur.next("Ce administrateur existe deja !");

   } else 
    this.httpservice.create("admins", formData).subscribe(
      (response: any) => {
        this.dtOptions= {};
        this.dtTrigger=new Subject<any>();
        // Gérez la réponse du service (par exemple, affichez un message de succès)
        this.modalService.dismissAll();
        this.dtOptions={}
        this.dtTrigger=new Subject()
        this.onCloseClick();
        this._success.next("L'administrateur a été ajouté avec succès.");

        this.ngOnInit();
      },
      (error: any) => {
        alert('Erreur lors de l\'ajout du Represantant : ' + error.message);
      }
    );
  }
    onCloseClick(): void {
      const offcanvasElement = this.elementRef.nativeElement.querySelector('.offcanvas');
      if (offcanvasElement) {
        this.renderer.removeClass(offcanvasElement, 'show');
      }
    }
  }
 

