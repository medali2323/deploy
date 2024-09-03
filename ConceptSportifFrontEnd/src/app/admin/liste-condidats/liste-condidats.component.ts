import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-liste-condidats',
  templateUrl: './liste-condidats.component.html',
  styleUrls: ['./liste-condidats.component.css']
})
export class ListeCondidatsComponent {
  Condidats: any;
  sps:any;
  adminIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Instructeur:any
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;
  nouveauCondidat: any = {};
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: any;
  categ_Condidats:any
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
    this.getallInstructeur();
    this.getallsps();
    this.getallcat_condidats()
  }

  load(): void {
    this.httpservice.getAll("Condidat").subscribe((response: any) => {
      console.log(response);
      this.Condidats = response;
     // this.Condidats = this.Condidats.filter((u: any) => u.roles[0].name === "Role_Condidat");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["/admin/candidat/candidats/edit/", id]);
  }

  call_delete_modal(adminId: any) {
    this.adminIdToDelete = adminId; // Update the ID to delete when the modal is opened
    console.log(adminId);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.adminIdToDelete) {
      this.httpservice.delete("Condidat", Number(this.adminIdToDelete)).subscribe(
        (response) => {
          console.log('Administrateur supprimé avec succès :', this.adminIdToDelete);
          this.dtOptions= {};
          this.dtTrigger=new Subject<any>();
          this._success.next("Le Condidat  a été supprimé avec succès.");

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

    if (f.invalid) {
      return;
    }
    this.nouveauCondidat=f.value;
   let salle_de_sport = {
    "id": Number(this.nouveauCondidat.salle_id)
};
let instructor = {
  "id": Number(this.nouveauCondidat.instructor_id)
};
let CategCondidat = {
  "id": Number(this.nouveauCondidat.cat_condidat)
};
this.nouveauCondidat.salle_de_sport = salle_de_sport;
this.nouveauCondidat.instructor = instructor;
this.nouveauCondidat.categCondidat = CategCondidat;
if (instructor.id===0) {
  this.nouveauCondidat.instructor = null;

}
if (salle_de_sport.id===0) {
  this.nouveauCondidat.salle_de_sport = null;

}
this.nouveauCondidat.username=this.nouveauCondidat.nom+"_"+this.nouveauCondidat.prenom

console.log(this.nouveauCondidat);

	 
let exist = this.Condidats.filter((e: any) => e.email === this.nouveauCondidat.email);
console.log(exist.length===0);

if (exist.length>0) {
console.log("pays exist");
this._erreur.next("Le condidat existe deja !");

} else 

this.httpservice.create("Condidat",this.nouveauCondidat).subscribe(
  (response: any) => {
    this.dtOptions= {};
    this.dtTrigger=new Subject<any>();
    // Gérez la réponse du service (par exemple, affichez un message de succès)

    this._success.next("Le Condidat  a été ajouté avec succès.");

    this.ngOnInit();
  },
  (error: any) => {
    alert('Erreur lors de l\'ajout du Condidat : ' + error.message);
  }
);

   
  }
  getallInstructeur(): void {
    this.httpservice.getAll("Instructor").subscribe((response: any) => {
      console.log(response);
      
      this.Instructeur = response;
   
    });
}
getallsps(): void {
  this.httpservice.getAll("SalleDeSport").subscribe((response: any) => {
    console.log(response);
    
    this.sps = response;
 
  });
}
getallcat_condidats(): void {
  this.httpservice.getAll("CategCondidat").subscribe((response: any) => {
    console.log(response);
    
    this.categ_Condidats = response;
 
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