import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.css']
})
export class DetailFormationComponent {
  formation: any;
  id: number=0;
  Categ_abonnement:any
  selectedCategAbonnementId: number | null = null;
  Instructors:any=[]
  Instructorsnot:any=[]

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formationService: HttpService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: true,
      lengthChange: false,
      language: {
        searchPlaceholder: 'Recherche'
      },
      dom: 'Bfrtip',
     
    };

    this.id = this.route.snapshot.params['id'];
    this.getformation(this.id);
    this.load()
  }

  getformation(id: number): void {
    this.formationService.getById("formation",id)
      .subscribe((data) => {
        this.formation = data;
        this.selectedCategAbonnementId=data.categ_abonnement.id

      });
  }
  load(): void {
    this.formationService.getById("LigneFormation/instructors",this.id).subscribe((response: any) => {
      console.log(response);
      this.Instructors = response;
     // this.Instructors = this.Instructors.filter((u: any) => u.roles[0].name === "Role_Instructor");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  loadnot(): void {
    this.formationService.getById("LigneFormation/instructorsnot",this.id).subscribe((response: any) => {
      console.log(response);
      this.Instructorsnot = response;
     // this.Instructors = this.Instructors.filter((u: any) => u.roles[0].name === "Role_Instructor");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  formatDate(date: string): string {
    return new Date(date).toISOString().substring(0, 10);
  }
  updateformation(): void {
    console.log(this.formation);
    let c: any = {
      code: this.formation.code,
      date: this.formation.date,
      sujet: this.formation.sujet,
      fraisFormation: this.formation.fraisFormation,
      nbrParticipant:this.formation.nbrParticipant,
      nbrPlaceMax: this.formation.nbrPlaceMax,
      categ_formation:{
        id:this.formation.id
      }
  };
    this.formationService.update("formation",this.id, c)
      .subscribe(() => {
        // Rediriger vers la liste des types d'abonnements après la modification
        this.router.navigate(['/admin/formations']);
      });
  }

  
}