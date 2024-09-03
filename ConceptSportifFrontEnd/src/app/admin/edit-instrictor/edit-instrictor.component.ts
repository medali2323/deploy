import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';
@Component({
  selector: 'app-edit-instrictor',
  templateUrl: './edit-instrictor.component.html',
  styleUrls: ['./edit-instrictor.component.css']
})
export class EditInstrictorComponent {
  instructeur: any;
  id: number=0;
  categ_Instructeur:any
  pays:any
  image:any
  selectedCategInstructeurId: number | null = null;
  selectedPaysId: number | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instructeurService: HttpService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getinstructeur(this.id);
    this.getallcateg_Instructeur();
    this.getallpays();
    this.getimages()
  }
  getimages() {
    this.instructeurService.getimageiById("Instructor/Imgageinstricteur",this.id)
    .subscribe((data) => {
      console.log(data);
      
      this.image = data;
    });
  }
  getallpays() {
    this.instructeurService.getAll("Pays")
    .subscribe((data) => {
      console.log(data);
      
      this.pays = data;
    });  }

  getinstructeur(id: number): void {
    this.instructeurService.getById("Instructor",id)
      .subscribe((data) => {
        console.log(data);
        
        this.instructeur = data;
        this.selectedCategInstructeurId=data.categInstructeur.id
        this.selectedPaysId=data.pays.id
      });
  }

  updateinstructeur(): void {
    let i: any = {
      username: this.instructeur.username,
      email: this.instructeur.email,
      nom: this.instructeur.nom,
      prenom: this.instructeur.prenom,
      adresse: this.instructeur.adresse,
      tel: this.instructeur.tel,
      profession: this.instructeur.profession,
      commentaire: this.instructeur.commentaire,
      sexe: this.instructeur.sexe,
      dateNaissance: this.instructeur.dateNaissance,
      filename: this.instructeur.filename,
      cin: this.instructeur.cin,
      pays: {
          id: this.selectedPaysId
      },
      categInstructeur: {
          id: this.selectedCategInstructeurId,
         
      },
    
  };
  
  // Utilisation de l'objet créé pour l'instructeur
  console.log(i);
  
    this.instructeurService.update("Instructor",this.id, i)
      .subscribe(() => {
        // Rediriger vers la liste des types d'abonnements après la modification
        this.router.navigate(['/admin/instructeurs/liste']);
      });
  }
  getallcateg_Instructeur(): void {
    this.instructeurService.getAll("categ_Instructeur").subscribe((response: any) => {
      console.log(response);
      
      this.categ_Instructeur = response;
   
    });
  }
}
