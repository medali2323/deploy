import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-liste-salle-de-sports',
  templateUrl: './liste-salle-de-sports.component.html',
  styleUrls: ['./liste-salle-de-sports.component.css']
})
export class ListeSalleDeSportsComponent {
  SalleDeSports: any;
  SalleDeSportToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Categ_rep:any
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;
  nouveauSalleDeSport: any = {};
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: any;
  nb:number=0
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  
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
  }

  load(): void {
   
    this.httpservice.getAll("SalleDeSport").subscribe((response: any) => {
    
      console.log(response);
      this.SalleDeSports = response;
      this.nb=this.SalleDeSports.length;
     // this.SalleDeSports = this.SalleDeSports.filter((u: any) => u.roles[0].name === "Role_SalleDeSport");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["/admin/candidat/salle_de_sports/edit/", id]);
  }

  call_delete_modal(SalleDeSport: any) {
    this.SalleDeSportToDelete = SalleDeSport; // Update the ID to delete when the modal is opened
    console.log(SalleDeSport);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.SalleDeSportToDelete) {
      this.httpservice.delete("SalleDeSport", Number(this.SalleDeSportToDelete)).subscribe(
        (response) => {
          console.log('Administrateur supprimé avec succès :', this.SalleDeSportToDelete);
          this._success.next("La salle de sport a été supprimée avec succès.");

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
  submitForm(f:NgForm) {
  this.nouveauSalleDeSport=f.value
   this.nouveauSalleDeSport.code='SS_' + (this.nb + 1).toString();
   console.log(this.nouveauSalleDeSport);
    let exist = this.SalleDeSports.filter((e: any) => e.email === this.nouveauSalleDeSport.email);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("pays exist");
    this._erreur.next("La salle de sport existe deja !");

   } else 
    this.httpservice.create("SalleDeSport",this.nouveauSalleDeSport).subscribe((response: any) => {
      // Gérez la réponse du service (par exemple, affichez un message de succès)
      this.dtOptions= {};
        this.dtTrigger=new Subject<any>();
      this.modalService.dismissAll();
      this.onCloseClick()
      this._success.next("La salle de sport a été ajoutée avec succès.");

      this.ngOnInit();
        }, (error: any) => {
      alert('Erreur lors de l\'ajout du SalleDeSport : ' + error.message);
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