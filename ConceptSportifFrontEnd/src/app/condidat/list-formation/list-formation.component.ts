import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-list-formation',
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.css']
})
export class ListFormationComponent {
  formations:any=[]
  formationPresentiel:any=[]
  formationenligne:any=[]
  formationalademande:any=[]
  LigneFormation:any=[]
  constructor(private httpservice: HttpService,private router:Router) {}
  ngOnInit(): void {
    this.load()
  }

  load(): void {
  
    let id = Number(localStorage.getItem("i"));
    this.httpservice.getById("LigneFormation/condidat", id).subscribe((response1: any) => {
      console.log(response1);
      this.LigneFormation = response1;
    
      // Créer un Map pour les Ligneformation
      const ligneformationMap = new Map<number, any>();
      this.LigneFormation.forEach((ligne: any) => {
        ligneformationMap.set(ligne.formation.id, ligne);
      });
    
      this.httpservice.getAll2("global/formation/approuves").subscribe((response: any) => {
        console.log(response);
        this.formations = response.map((formation: any) => {
          if (ligneformationMap.has(formation.id)) {
            formation.liigneformation = ligneformationMap.get(formation.id);
          } else {
            formation.liigneformation = null;
          }
          return formation;
        });
        console.log(this.formations);
        this.formationPresentiel=this.formations.filter((item:any) => item.emplacement)
        this.formationenligne=this.formations.filter((item:any) => item.lienMeet)
      
    this.formationalademande=this.formations.filter((item:any) => item.lienVideo)
    console.log(this.formationPresentiel);
    console.log(this.formationalademande);
    console.log(this.formationenligne);
    
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
      formation:{id:item.id},
      paye:false,
      approuve:false
    }
    console.log(aux);
    
    this.httpservice.create("LigneFormation",aux).subscribe((response: any) => {
      console.log(response);
      this.formations = response;
      this.router.navigate(['candidat/formation'])
      window.location.reload();
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  selectedTab: string = 'presentiel';

  selectTab(tab: string) {
    this.selectedTab = tab;
    console.log(tab);
    
  }
}
