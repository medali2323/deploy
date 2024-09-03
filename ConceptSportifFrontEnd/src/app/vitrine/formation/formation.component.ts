import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent {
  formationalademande:any=[]
  formationenligne:any=[]
  formationpresentiel:any=[]
  selectedTab: string='inPerson';

  constructor(private httpservice: HttpService,private router:Router,private route:ActivatedRoute) {}

  ngOnInit(): void {
    
       this.load();
 }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  load(): void {
    this.httpservice.getAll2("global/formationAlaDemande/approuves").subscribe((response: any) => {
      console.log(response);
      this.formationalademande = response;
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
    this.httpservice.getAll2("global/formationEnLigne/approuves").subscribe((response: any) => {
      console.log(response);
      this.formationenligne = response;
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
    this.httpservice.getAll2("global/formationPresentiels/approuves").subscribe((response: any) => {
      console.log(response);
      this.formationpresentiel = response;
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  

 
}
