import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-add-evenement',
  templateUrl: './add-evenement.component.html',
  styleUrls: ['./add-evenement.component.css']
})
export class AddEvenementComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  Instructor: any[] = [];
  Type_evenements: any[] = [];
  produits:any=[];
  editdata:any
  selectedProductId: number | null = null; // ID du produit sélectionné

  t:number=0
  tot:number=0
  totttc:number=0
  tab:any=[]
  nb:number=0
  nouvelleevent: any = { 
    description: '',
  capacicite:0
  
  };
  datefin: Date=new Date()
  datedeb: Date=new Date()
  heuredebu: string=''; 
  heurefin: string=''; 
  ispresentiel:boolean=false
  isenligne:boolean=false
  changeCateg(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    console.log('Catégorie sélectionnée :', selectedValue);
  
    if (selectedValue === '1') {
     this.ispresentiel=true
     this.isenligne=false
    } else if (selectedValue === '2') {
     this.isenligne=true
     this.ispresentiel=false
  
  
    } 
   }
    constructor(private httpservice: HttpService, private modalService: NgbModal,private route:Router) {
    
    }
  
    ngOnInit(): void {
      this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
    this._erreur.subscribe(message => this.erreurMessage = message);
    this._erreur.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
      this.getall_Instructor();
      this.getall_Type_evenement();
      this.getall_evement()
      this.nouvelleevent.nbr_participant=0
    }
  

    getall_evement(): void {
      this.httpservice.getAll("Evenement").subscribe((response: any) => {
        console.log(response);
        this.nb = response.length;
     
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }

  
    getall_Instructor(): void {
      this.httpservice.getAll("Instructor").subscribe((response: any) => {
        console.log(response);
        this.Instructor = response;
     
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
    getall_Type_evenement(): void {
      this.httpservice.getAll("Type_evenement").subscribe((response: any) => {
        console.log(response);
        this.Type_evenements = response;
     
  
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }
 
  add_ligne_table_ins(i:any) {

    // Vérifie si l'élément existe déjà dans tab
    const existingItem = this.tab.find((item:any) => item.id === i.id);
    console.log(existingItem);
   
    if (existingItem) {
        // Élément déjà présent, effectuez ici les actions que vous souhaitez
        console.log("L'élément existe déjà dans le tableau.");
    } else {
    
       
        this.tab.push(i);
        console.log(this.tab);
        this.nbpr=this.nouvelleevent.capacite-this.tab.length
        console.log(this.nbpr);
        
        this.nouvelleevent.nbr_participant=this.tab.length
        console.log(this.nouvelleevent.nbr_participant);
        
    }
  
}
changecapacite(){
  this.nbpr=this.nouvelleevent.capacite-this.tab.length
        console.log(this.nbpr);
        
        this.nouvelleevent.nbr_participant=this.tab.length
        console.log(this.nouvelleevent.nbr_participant);
}
nbpr:number=0
  removeRow(){
    this.tab = this.tab.filter((item: any) => !item.checked);
    this.nbpr=this.nouvelleevent.capacite-this.tab.length
    console.log(this.nbpr);
    
    this.nouvelleevent.nbr_participant=this.tab.length
    console.log(this.nouvelleevent.nbr_participant);
    }
    ajouternouvelleevent(f: NgForm): void {
     this.nouvelleevent=f.value;
    console.log(this.nouvelleevent);
    this.nouvelleevent.typeEvenement={
      'id':Number(this.nouvelleevent.typeEvenement_id)
    }
    let nouvelleeventSansIds = { 
      code: 'E_'+(this.nb+1).toString(),
      description: this.nouvelleevent.description,
      dateDebut:this.nouvelleevent.datedeb,
      dateFin:this.nouvelleevent.datefin,
      heureDebut:this.nouvelleevent.heuredebu,
      heureFin:this.nouvelleevent.heurefin,
      nbrParticipant:this.tab.length,
      nbrPlaceRestant:this.nbpr,
      nbrPlaceDispo:this.nouvelleevent.nbr_place_dispo,
      fait:false,
      approuve:false,
      typeEvenement:this.nouvelleevent.typeEvenement,
      emplacement:this.nouvelleevent.emplacement
    };
  console.log(nouvelleeventSansIds);
  console.log(this.tab);
  if(nouvelleeventSansIds.typeEvenement.id===1){
    this.httpservice.create("EvenementPresentiel", nouvelleeventSansIds).subscribe((response: any) => {
      const b=response
      console.log(response);
      let t=0;
      for (let index = 0; index < this.tab.length; index++) {
        const e = this.tab[index];
        console.log(e);
        
        let aux={
          instructor :{
            id:e.id
          },
          evenement:{
            id:response.id
          }
        }
        this.httpservice.create("LigneEvenement", aux).subscribe((response1: any) => {
          console.log(response1);
          
      
    
          
        }, (error: any) => {
          alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
        });
  
      }
      this._success.next("L'évenement a été ajouté avec succès.");

     
                 this.route.navigate(["/admin/evenement/liste"])
  
  
  
    }, (error: any) => {
      alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
    });
  }else  if(nouvelleeventSansIds.typeEvenement.id===2){
    this.httpservice.generateMeetLink(this.nouvelleevent.description).subscribe(
      (link: string) => {
        console.log('Lien Jitsi Meet généré :', link);
        // Utilisez le lien Jitsi Meet ici, par exemple, affichez-le dans l'interface utilisateur
        let nouvelleeventSansIds = { 
          code: 'E_'+(this.nb+1).toString(),
          description: this.nouvelleevent.description,
          dateDebut:this.nouvelleevent.datedeb,
          dateFin:this.nouvelleevent.datefin,
          heureDebut:this.nouvelleevent.heuredebu,
          heureFin:this.nouvelleevent.heurefin,
          nbrParticipant:this.tab.length,
          nbrPlaceRestant:this.nbpr,
          nbrPlaceDispo:this.nouvelleevent.nbr_place_dispo,
          fait:false,
          approuve:false,
          typeEvenement:this.nouvelleevent.typeEvenement,
          linkMeet:link,

        };
        this.httpservice.create("EvenementEnLigne",nouvelleeventSansIds).subscribe((response2: any) => {
          const b=response2
          console.log(response2);
          let t=0;
          for (let index = 0; index < this.tab.length; index++) {
            const e = this.tab[index];
            
            let aux={
              instructor :{
                id:e.id
              },
              evenement:{
                id:response2.id
              }
             
            }
            this.httpservice.create("LigneEvenement", aux).subscribe((response1: any) => {
              console.log(response1);
              
              this._success.next("L'évenement a été ajouté avec succès.");

        
              
            }, (error: any) => {
              alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
            });
      
          }
              
         
                     this.route.navigate(["/admin/evenement/liste"])
      
    
    
        }, (error: any) => {
          alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
        });
  
      },
      (error:any) => {
        console.error('Erreur lors de la génération du lien Jitsi Meet :', error);
      }
    );
  }



 
   // 
   // 

    }
   
 
  
  }
  