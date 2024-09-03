import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/servises/http.service';
import { Subject, debounceTime } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
@Component({
  selector: 'app-liste-instructeurs',
  templateUrl: './liste-instructeurs.component.html',
  styleUrls: ['./liste-instructeurs.component.css']
})
export class ListeInstructeursComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  Instructors: any;
  pays:any;
  adminIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  categ_Instructeur:any
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;
  nouveauInstructor: any = {};
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: any;
  nb:number=0
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
    this.getallcateg_Instructeur();
    this.getallpays();
    this.loadnb()
  }

  load(): void {
    this.httpservice.getAll("Instructor").subscribe((response: any) => {
      console.log(response);
      this.Instructors = response;
     // this.Instructors = this.Instructors.filter((u: any) => u.roles[0].name === "Role_Instructor");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  loadnb(): void {
    this.httpservice.getAll("Compte").subscribe((response: any) => {
      console.log(response);
      this.nb = response.length;
     // this.Instructors = this.Instructors.filter((u: any) => u.roles[0].name === "Role_Instructor");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["/admin/instructeurs/edit/", id]);
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
          this.dtOptions= {};
          this.dtTrigger=new Subject<any>();
          this._success.next("L'instricteur a été supprimé avec succès.");

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
    this.nouveauInstructor=f.value;
    console.log(this.nouveauInstructor);
    
    const formData = new FormData();
    formData.append('username', this.nouveauInstructor.username);
    formData.append('email', this.nouveauInstructor.email);
    formData.append('password', this.nouveauInstructor.password);
    formData.append('nom', this.nouveauInstructor.nom);
    formData.append('prenom', this.nouveauInstructor.prenom);
    formData.append('adresse', this.nouveauInstructor.adresse);
    formData.append('profession', this.nouveauInstructor.profession);
    formData.append('commentaire', this.nouveauInstructor.commentaire);
    formData.append('sexe', this.nouveauInstructor.sexe);
    formData.append('dateNaissance', this.nouveauInstructor.date_naiss);
    formData.append('filename', this.nouveauInstructor.filename);
    formData.append('cin', this.nouveauInstructor.cin);
    formData.append('file', this.userFile);
    formData.append('tel', this.nouveauInstructor.tel);
    formData.append('categInstructeur', this.nouveauInstructor.cat_inst_id);
    formData.append('pays', this.nouveauInstructor.pays_id);

    
    let token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
     
    let exist = this.Instructors.filter((e: any) => e.email === this.nouveauInstructor.email);
    console.log(exist.length===0);
    
   if (exist.length>0) {
    console.log("pays exist");
    this._erreur.next("Cet instricteur existe deja !");

   } else 
    this.http.post('http://localhost:8082/api/Instructor', formData, { headers }).subscribe(

      (response: any) => {
        console.log(response);
        
     let   nouveaucompte:any={
      code:'CI_'+(this.nb+1).toString(),
      solde:0,
      dateCreation:new Date(),
      dateDerniereModification:new Date(),
      instructor:{
        id:response.id
      }

     }
     console.log(nouveaucompte);
     
        this.httpservice.create("Compte",nouveaucompte ).subscribe((response: any) => {
          // Gérez la réponse du service (par exemple, affichez un message de succès)
        }, (error: any) => {
          // Gérez les erreurs du service (par exemple, affichez un message d'erreur)
          alert('Erreur lors de l\'ajout du CategCondidat : ' + error.message);
        });
        this.dtOptions= {};
        this.dtTrigger=new Subject<any>();
        // Gérez la réponse du service (par exemple, affichez un message de succès)
        this._success.next("L'instricteur a été ajouté avec succès.");

        this.ngOnInit();
      },
      (error: any) => {
        alert('Erreur lors de l\'ajout du Instructor : ' + error.message);
      }
    );
   
  }
  getallcateg_Instructeur(): void {
    this.httpservice.getAll("categ_Instructeur").subscribe((response: any) => {
      console.log(response);
      
      this.categ_Instructeur = response;
   
    });
}
getallpays(): void {
  this.httpservice.getAll("Pays").subscribe((response: any) => {
    console.log(response);
    
    this.pays = response;
 
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