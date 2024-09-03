import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-edit-represantant',
  templateUrl: './edit-represantant.component.html',
  styleUrls: ['./edit-represantant.component.css']
})
export class EditRepresantantComponent {
  represantant: any;
  id: number=0;
  categ_represantant:any
  catreps:any
  image:any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private represantantService: HttpService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getrepresantant(this.id);
    this.getallcatreps()
  }
 


  getrepresantant(id: number): void {
    this.represantantService.getById("Represantant",id)
      .subscribe((data) => {
        console.log(data);
        
        this.represantant = data;
      });
  }

  updaterepresantant(): void {
    let a = {
      adresse: this.represantant.adresse,
      email: this.represantant.email,
      username: this.represantant.username,
      nom: this.represantant.nom,
      prenom: this.represantant.prenom,
      password: this.represantant.password,
      raisonSociale: this.represantant.raisonSociale,
      contact: this.represantant.contact,
      mf: this.represantant.mf,
      rc: this.represantant.rc,
      localisation: this.represantant.localisation,
      categRep: this.represantant.categRep
  };
  
    console.log(a);

    this.represantantService.update("Represantant",this.id, a)
      .subscribe(() => {
        // Rediriger vers la liste des types d'abonnements après la modification
        this.router.navigate(['/admin/representants/liste']);
      });
  }
  getallcatreps() {
    this.represantantService.getAll("categorie_representant")
    .subscribe((data) => {
      console.log(data);
      
      this.catreps = data;
    });  }
}
