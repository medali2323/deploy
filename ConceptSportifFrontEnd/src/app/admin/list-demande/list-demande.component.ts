import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent {
  LigneCours: any;
  sps:any;
  adminIdToDelete: string = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  Instructeur:any
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective | undefined;
  nouveaucours: any = {};
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: any;
  categ_LigneCours:any
  id: number=0;
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  constructor(private httpservice: HttpService, private modalService: NgbModal,private http: HttpClient,private renderer: Renderer2, private elementRef: ElementRef,private router:Router,private route:ActivatedRoute) {}

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
nb:number=0
c = this.route.snapshot.params['c'];

  load(): void {
    this.c = this.route.snapshot.params['c'];

   if (this.c==="cours") {
    this.httpservice.getAll("LigneCours").subscribe((response: any) => {
      console.log(response);
      this.LigneCours = response;
      this.nb=response.length
     // this.LigneCours = this.LigneCours.filter((u: any) => u.roles[0].name === "Role_cours");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
   }else if(this.c==="formation"){
    this.httpservice.getAll("LigneFormation").subscribe((response: any) => {
      console.log(response);
      this.LigneCours = response;
      this.nb=response.length
     // this.LigneCours = this.LigneCours.filter((u: any) => u.roles[0].name === "Role_cours");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
   }
  }
  edit(id: any) {
    // Add logic for editing an admin
    this.router.navigate(["/admin/LigneCours/", id]);
  }

  call_delete_modal(adminId: any) {
    this.adminIdToDelete = adminId; // Update the ID to delete when the modal is opened
    console.log(adminId);
  }

  delete() {
    // Check first that the ID to delete is not empty
    if (this.adminIdToDelete) {
      this.httpservice.delete("LigneCours", Number(this.adminIdToDelete)).subscribe(
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


  onCloseClick(): void {
    const offcanvasElement = this.elementRef.nativeElement.querySelector('.offcanvas');
    if (offcanvasElement) {
      this.renderer.removeClass(offcanvasElement, 'show');
    }
  }
  approuve(item:any){
    item.approuve=true
    if (this.c==="cours") {
      let aux={
        id:item.id,
        approuve:true,
        paye:item.paye,
        condidat:{
          id:item.condidat.id
                },
                cours:{
                  id:item.cours.id
                }      
            
      }
      this.httpservice.update("LigneCours", item.id,aux).subscribe((ruv: any) => {
        this._success.next("La demande a éte approuvée avec succès.");

        console.log(ruv);
        this.load()
    
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    } else  if (this.c==="formation") {

      let aux={
        id:item.id,
        approuve:true,
        paye:item.paye,
        condidat:{
          id:item.condidat.id
                },
                formation:{
                  id:item.formation.id
                }      
            
      }
      this.httpservice.update("LigneFormation", item.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        if(item.condidat.instructor!=null){
          this.httpservice.getById("Compte/byInstructor",item.condidat.instructor.id).subscribe((rc: any) => {
            console.log(rc);
         let r = rc;
         let p:any
         this.httpservice.getById("pourcentages/byCategory",item.condidat.instructor.id).subscribe((rp: any) => {
           console.log(rp);
           p = rp;
           let op={
           // code:'OP_' + (this.nb1 + 1).toString(),
             type:'credit',
             montant:item.formation.fraisFormation*(p.pourcentage_client/100),
             date:new Date(),
             compte:{
              id:r.id
             }
           }
           this.httpservice.create("Operation", op).subscribe((response1: any) => {
             console.log(response1);
           
             console.log(aux);
    
            
         let aux1={
          code:r.code,
          dateCreation:r.dateCreation,
          dateDerniereModification:new Date(),
          solde:r.solde+op.montant,
          instructor:{
            id:r.instructor.id
      
          }
         }
            this.httpservice.update("Compte", r.id,aux1).subscribe((ruc: any) => {
              console.log(ruc);
           //   this._success.next("L'encaissement a été ajouté avec succès.");
           this._success.next("La demande a éte approuvée avec succès.");

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
        }
    
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
      this.load()

    } 
  }
  deapprouve(item:any){
    item.approuve=true
    if (this.c==="cours") {
      let aux={
        id:item.id,
        approuve:false,
        paye:item.paye,
        condidat:{
          id:item.condidat.id
                },
                cours:{
                  id:item.cours.id
                }      
            
      }
      this.httpservice.update("LigneCours", item.id,aux).subscribe((ruv: any) => {
        this._success.next("La demande a éte deapprouvée avec succès.");

        console.log(ruv);
        this.load()

    
  
        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    } else  if (this.c==="formation") {

      let aux={
        id:item.id,
        approuve:false,
        paye:item.paye,
        condidat:{
          id:item.condidat.id
                },
                formation:{
                  id:item.formation.id
                }      
            
      }
      this.httpservice.update("LigneFormation", item.id,aux).subscribe((ruv: any) => {
        console.log(ruv);
        if(item.condidat.instructor!=null){
          this.httpservice.getById("Compte/byInstructor",item.condidat.instructor.id).subscribe((rc: any) => {
            console.log(rc);
         let r = rc;
         let p:any
         this.httpservice.getById("pourcentages/byCategory",item.condidat.instructor.id).subscribe((rp: any) => {
           console.log(rp);
           p = rp;
           let op={
           // code:'OP_' + (this.nb1 + 1).toString(),
             type:'credit',
             montant:item.formation.fraisFormation*(p.pourcentage_client/100),
             date:new Date(),
             compte:{
              id:r.id
             }
           }
           this.httpservice.create("Operation", op).subscribe((response1: any) => {
             console.log(response1);
           
             console.log(aux);
    
            
         let aux1={
          code:r.code,
          dateCreation:r.dateCreation,
          dateDerniereModification:new Date(),
          solde:r.solde+op.montant,
          instructor:{
            id:r.instructor.id
      
          }
         }
            this.httpservice.update("Compte", r.id,aux1).subscribe((ruc: any) => {
              console.log(ruc);
           //   this._success.next("L'encaissement a été ajouté avec succès.");
           this._success.next("La demande a éte approuvée avec succès.");

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
        }
    
        this.load()

        
      }, (error: any) => {
        alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
      });
    } 
  }
}
