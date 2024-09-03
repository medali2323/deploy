import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent {
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

    this.load();
  //  this.getallInstructeur();
    this.getallsps();
    this.getallcat_condidats()
  }
id=Number(localStorage.getItem("i"))
  load(): void {
    this.httpservice.getById("Condidat/instructor",this.id).subscribe((response: any) => {
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
  "id": Number(localStorage.getItem("i"))
};
let CategCondidat = {
  "id": Number(this.nouveauCondidat.cat_condidat)
};
this.nouveauCondidat.salle_de_sport = salle_de_sport;
this.nouveauCondidat.instructor = instructor;
this.nouveauCondidat.categCondidat = CategCondidat;
console.log(this.nouveauCondidat);

this.httpservice.create("Condidat",this.nouveauCondidat).subscribe(
  (response: any) => {
    this.dtOptions= {};
    this.dtTrigger=new Subject<any>();
    // Gérez la réponse du service (par exemple, affichez un message de succès)
    this.modalService.dismissAll();
    this.onCloseClick();
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