import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-edit-condidat',
  templateUrl: './edit-condidat.component.html',
  styleUrls: ['./edit-condidat.component.css']
})
export class EditCondidatComponent {
  condidat: any;
  id: number=0;
  categ_Condidats:any
  sps:any
  image:any
  Instructeur:any
  selectedInstructorId: number | null = null;
  selectedSalleDeSportId: number | null = null;
  selectedCategCondidatId: number | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private condidatService: HttpService
    
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getcondidat(this.id);
    this.getallcat_condidats();
    this.getallsps();
    this.getallInstructeur();
  }
  
  getallInstructeur(): void {
    this.condidatService.getAll("Instructor").subscribe((response: any) => {
      console.log(response);
      
      this.Instructeur = response;
      
   
    });
}
getallsps(): void {
  this.condidatService.getAll("SalleDeSport").subscribe((response: any) => {
    console.log(response);
    
    this.sps = response;
 
  });
}
getallcat_condidats(): void {
  this.condidatService.getAll("CategCondidat").subscribe((response: any) => {
    console.log(response);
    
    this.categ_Condidats = response;
 
  });
}

  getcondidat(id: number): void {
    this.condidatService.getById("Condidat",id)
      .subscribe((data) => {
        console.log(data);
        
        this.condidat = data;
        this.selectedInstructorId=data.categCondidat.id

      });
  }

  updatecondidat(): void {
    let c: any = {
      nom: this.condidat.nom,
      prenom: this.condidat.prenom,
      tel1: this.condidat.tel1,
      tel2: this.condidat.tel2,
      email: this.condidat.email,
      adresse: this.condidat.adresse,
      code_postal: this.condidat.code_postal,
      mt_affiliation: this.condidat.mt_affiliation,
      categCondidat: {
        id: this.selectedCategCondidatId,
      },
      salle_de_sport: {
          id: this.selectedSalleDeSportId,
      },
      instructor: {
          id: this.selectedInstructorId,
          
      }
  };
  console.log(c);
  
  
    this.condidatService.update("Condidat",this.id, c)
      .subscribe(() => {
        // Rediriger vers la liste des types d'abonnements après la modification
        this.router.navigate(['/admin/candidat/candidats/liste']);
      });
  }
  updateSelectedInstructor() {
    // Mettre à jour la valeur de l'instructeur dans condidat avec la nouvelle valeur sélectionnée
    this.condidat.instructor = this.Instructeur.find((i: any) => i.id === this.selectedInstructorId);
}
updateSelectedSalleDeSport() {
  // Spécifier le type de 's' comme SalleDeSport
  this.condidat.salle_de_sport = this.sps.find((s: any) => s.id === this.selectedSalleDeSportId);
}
updateSelectedCategCondidat() {
  // Spécifier le type de 'cat' comme CategCondidat
  this.condidat.categCondidat = this.categ_Condidats.find((cat: any) => cat.id === this.selectedCategCondidatId);
}
}
