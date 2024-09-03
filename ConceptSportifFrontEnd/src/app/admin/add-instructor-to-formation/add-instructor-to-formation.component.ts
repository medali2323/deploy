import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-add-instructor-to-formation',
  templateUrl: './add-instructor-to-formation.component.html',
  styleUrls: ['./add-instructor-to-formation.component.css']
})
export class AddInstructorToFormationComponent {
  formation: any;
  id: number=0;
  Categ_abonnement:any
  selectedCategAbonnementId: number | null = null;
  Instructors:any=[]
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
    this.formationService.getById("LigneFormation/instructorsnot",this.id).subscribe((response: any) => {
      console.log(response);
      this.Instructors = response;
     // this.Instructors = this.Instructors.filter((u: any) => u.roles[0].name === "Role_Instructor");
      this.dtTrigger.next(null);
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
   
  }

  updateformation(): void {
    console.log(this.formation);
    let c: any = {
      code: this.formation.code,
      nomsalle: this.formation.nomsalle,
      tel1: this.formation.tel1,
      tel2: this.formation.tel2,
      email: this.formation.email,
      adresse: this.formation.adresse,
     
  };
    this.formationService.update("formation",this.id, c)
      .subscribe(() => {
        // Rediriger vers la liste des types d'abonnements après la modification
        this.router.navigate(['/instructor/candidat/salle_de_sports']);
      });
  }
  selectedinstructors: any[] = [];
  selectAll(event: any) {
    const checked = event.target.checked;
    this.selectedinstructors = [];
    this.Instructors.forEach((admin: any) => {
        admin.selected = checked;
        if (checked) {
            this.selectedinstructors.push({ id: admin.id });
        }
    });
}

checkSelected() {
    this.selectedinstructors = this.Instructors.filter((admin: any) => admin.selected)
        .map((admin: any) => ({ id: admin.id }));
    console.log(this.selectedinstructors);
}

submitForm() {
    // Soumettre le formulaire avec les instructeurs sélectionnés
    if (this.formation.nbrPlaceMax>=this.selectedinstructors.length+this.formation.nbrParticipant) {
      console.log(this.selectedinstructors);

      this.selectedinstructors.forEach(element => {
        let aux:any={
          formation:{
            id:Number(this.id)
          },
          instructor:{
            id:element.id
          }
        }
     
        
        this.formationService.create("LigneFormation", aux).subscribe((response1: any) => {
          console.log(response1);
      
    
          
        }, (error: any) => {
          alert('Erreur lors de l\'ajout du categorie_representant : ' + error.message);
        });
  
      });
     // console.log(this.formation);
      let c: any = {
        code: this.formation.code,
        date: this.formation.date,
        sujet: this.formation.sujet,
        fraisFormation: this.formation.fraisFormation,
        nbrPlaceMax: this.formation.nbrPlaceMax,
        categ_formation:{
          id:this.formation.id
        },
        nbrParticipant: this.formation.nbrParticipant+this.selectedinstructors.length
    };
    console.log(c);
    
      this.formationService.update("formation",this.id, c)
        .subscribe(() => {
          // Rediriger vers la liste des types d'abonnements après la modification
        });
      window.location.reload();
      } else {
      alert("le nembre de place insifissant !")
    }
  
  

}
}