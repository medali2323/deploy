import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  coursalademande: any[] = [];
  coursenligne: any[] = [];
  courspresentiel: any[] = [];
  selectedTab: string='';

  constructor(private httpservice: HttpService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to route parameters to react to changes
    this.route.params.subscribe(params => {
      this.selectedTab = params['type'] || 'inPerson'; // Default to 'inPerson' if no type is provided
      this.load(); // Load data each time the tab changes
    });
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.router.navigate([], { relativeTo: this.route, queryParams: { type: tab } });
  }

  load(): void {
    this.httpservice.getAll2("global/CourAlaDemande/approuves").subscribe((response: any) => {
      console.log(response);
      this.coursalademande = response;
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });

    this.httpservice.getAll2("global/CoursEnLigne/approuves").subscribe((response: any) => {
      console.log(response);
      this.coursenligne = response;
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });

    this.httpservice.getAll2("global/CourPresentiels/approuves").subscribe((response: any) => {
      console.log(response);
      this.courspresentiel = response;
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
}
