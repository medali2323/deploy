import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-payer',
  templateUrl: './payer.component.html',
  styleUrls: ['./payer.component.css']
})
export class PayerComponent {
  cours:any={}
  id = this.route.snapshot.params['id'];
  c = this.route.snapshot.params['c'];

  constructor(private httpservice: HttpService,private router:Router,private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.id=Number(this.id)
    this.load()
  }
  load(): void {
  if (this.c==="cours") {
    this.httpservice.getById("Cours",this.id).subscribe((response: any) => {
      console.log(response);
      this.cours = response;
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  } else if (this.c==="formation") {
    this.httpservice.getById("formation",this.id).subscribe((response: any) => {
      console.log(response);
      this.cours = response;
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  }
  achheter(){
   if(this.c==="cours"){
    let aux={
      condidat:{id:localStorage.getItem("i")},
      cours:{id:this.id},
      paye:true,
      approuve:false
    }
    console.log(aux);
    
    this.httpservice.create("LigneCours",aux).subscribe((response: any) => {
      console.log(response);
      this.cours = response;
      this.router.navigate(['candidat/cours'])
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
   }else if(this.c==="formation"){
    let aux={
      condidat:{id:localStorage.getItem("i")},
      formation:{id:this.id},
      paye:true,
      approuve:false
    }
    console.log(aux);
    let c=localStorage.getItem("i")
    this.httpservice.getById2("LigneFormation/condidat",Number(c),this.id).subscribe((response: any) => {
      let lf:any=response.length
     if (lf===0) {
      this.httpservice.create("LigneFormation",aux).subscribe((response1: any) => {
        console.log(response);
        this.cours = response;
        this.router.navigate(['candidat/formation'])
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
     }
     if (lf>0) {
      this.httpservice.update("LigneFormation",response[0].id,aux).subscribe((response1: any) => {
        console.log(response);
        this.cours = response;
        if (response[0].approuve) {
          this.httpservice.getById("Compte/byInstructor",response[0].condidat.instructor.id).subscribe((rc: any) => {
            console.log(rc);
         let r = rc;
         let p:any
         this.httpservice.getById("pourcentages/byCategory",response[0].condidat.instructor.id).subscribe((rp: any) => {
           console.log(rp);
           p = rp;
           let op={
           // code:'OP_' + (this.nb1 + 1).toString(),
             type:'credit',
             montant:response[0].formation.fraisFormation*(p.pourcentage_client/100),
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
        this.router.navigate(['candidat/formation'])
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
     }
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  
   }
  
  }

}
