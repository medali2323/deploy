import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent  implements OnInit{
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
    successMessage:any=''
  erreurMessage:any=''
  cours:any=[]
  LigneCours:any=[]
  coursPresentiel:any=[]
  coursenligne:any=[]
  coursalademande:any=[]
  selfClosingAlert: any;

  constructor(private httpservice: HttpService,private router:Router) {}
  ngOnInit(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
    this._erreur.subscribe(message => this.erreurMessage = message);
    this._erreur.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
    this.load()
  }
  load(): void {
  
    let id = Number(localStorage.getItem("i"));
    this.httpservice.getById("LigneCours/condidat", id).subscribe((response1: any) => {
      console.log(response1);
      this.LigneCours = response1;
    
      // Créer un Map pour les LigneCours
      const ligneCoursMap = new Map<number, any>();
      this.LigneCours.forEach((ligne: any) => {
        ligneCoursMap.set(ligne.cours.id, ligne);
      });
    
      this.httpservice.getAll2("global/cours/approuves").subscribe((response: any) => {
        console.log(response);
        this.cours = response.map((cours: any) => {
          if (ligneCoursMap.has(cours.id)) {
            cours.liigneCours = ligneCoursMap.get(cours.id);
          } else {
            cours.liigneCours = null;
          }
          return cours;
        });
        console.log(this.cours);
        this.coursPresentiel=this.cours.filter((item:any) => item.emplacement)
        this.coursenligne=this.cours.filter((item:any) => item.lienmeet)
        console.log(this.coursenligne);
        
        this.coursalademande=this.cours.filter((item:any) => item.lienvideo)
      }, (error: any) => {
        console.error('Erreur lors de la récupération des données:', error);
      });
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
    
  }
  demande(item:any){
    let aux={
      condidat:{id:localStorage.getItem("i")},
      cours:{id:item.id},
      paye:false,
      approuve:false
    }
    console.log(aux);
    
    this.httpservice.create("LigneCours",aux).subscribe((response: any) => {
      console.log(response);
      this.cours = response;
      this._success.next("La demande a été ajoutée avec succès.");
      this.load()

    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  selectedTab: string = 'presentiel';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

}
