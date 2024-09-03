import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-liste-representants',
  templateUrl: './liste-representants.component.html',
  styleUrls: ['./liste-representants.component.css']
})
export class ListeRepresentantsComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  Represantants: any;
  adminIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Categ_rep:any
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;
  nouveauRepresantant: any = {};
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: any;
  constructor(private httpservice: HttpService, private modalService: NgbModal,private http: HttpClient,private renderer: Renderer2, private elementRef: ElementRef,private router:Router) {}

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
	
    this.load();
    this.getallCateg_rep();
  }

  load(): void {
    this.dtOptions={}
    this.dtTrigger=new Subject()
    this.httpservice.getAll("Represantant").subscribe((response: any) => {
      this.dtOptions={}
      this.dtTrigger=new Subject()
      console.log(response);
      this.Represantants = response;
     // this.Represantants = this.Represantants.filter((u: any) => u.roles[0].name === "Role_Represantant");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["admin/representants/edit/", id]);
  }

  call_delete_modal(adminId: any) {
    this.adminIdToDelete = adminId; // Update the ID to delete when the modal is opened
    console.log(adminId);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.adminIdToDelete) {
      this.httpservice.delete("auth/users", Number(this.adminIdToDelete)).subscribe(
        (response) => {
          console.log('Administrateur supprimé avec succès :', this.adminIdToDelete);
          this._success.next("Le supprimé a été ajouté avec succès.");

          this.load();
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
  submitForm() {
    let categ_abonnement={
      "id":Number(this.nouveauRepresantant.catrep_id)
    }
    this.nouveauRepresantant.categRep=categ_abonnement
    console.log(this.nouveauRepresantant);
    let exist = this.Represantants.filter((e: any) => e.email === this.nouveauRepresantant.email);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("pays exist");
    this._erreur.next("Le représentant existe deja !");

   } else 
    this.httpservice.create("Represantant",this.nouveauRepresantant).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.dtOptions= {};
        this.dtTrigger=new Subject<any>();
      this.modalService.dismissAll();
      this.onCloseClick()
      this._success.next("Le représentant a été ajouté avec succès.");

      this.ngOnInit();
        }, (error: any) => {
      alert('Erreur lors de l\'ajout du Represantant : ' + error.message);
    });
  }
  getallCateg_rep(): void {
    this.httpservice.getAll("categorie_representant").subscribe((response: any) => {
      console.log(response);
      
      this.Categ_rep = response;
   
    });
}
onSelectFile(event:any) {
  if (event.target.files.length > 0)
  {
    const file = event.target.files[0];
    this.userFile = file;
   // this.f['profile'].setValue(file);

  var mimeType = event.target.files[0].type;
  if (mimeType.match(/image\/*/) == null) {
    this.message = "Only images are supported.";
    return;
  }

  var reader = new FileReader();
  
  this.imagePath = file;
  reader.readAsDataURL(file); 
  reader.onload = (_event) => { 
    this.imgURL = reader.result; 
  }
}
   
    
  }
  onCloseClick(): void {
    const offcanvasElement = this.elementRef.nativeElement.querySelector('.offcanvas');
    if (offcanvasElement) {
      this.renderer.removeClass(offcanvasElement, 'show');
    }
  }
}