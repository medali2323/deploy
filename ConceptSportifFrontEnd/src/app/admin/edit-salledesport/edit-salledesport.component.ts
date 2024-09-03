import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-edit-salledesport',
  templateUrl: './edit-salledesport.component.html',
  styleUrls: ['./edit-salledesport.component.css']
})
export class EditSalledesportComponent {
  salledesport: any;
  id: number=0;
  Categ_abonnement:any
  selectedCategAbonnementId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private salledesportService: HttpService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getsalledesport(this.id);
  }

  getsalledesport(id: number): void {
    this.salledesportService.getById("SalleDeSport",id)
      .subscribe((data) => {
        this.salledesport = data;
        this.selectedCategAbonnementId=data.categ_abonnement.id

      });
  }

  updatesalledesport(): void {
    console.log(this.salledesport);
    let c: any = {
      code: this.salledesport.code,
      nomsalle: this.salledesport.nomsalle,
      tel1: this.salledesport.tel1,
      tel2: this.salledesport.tel2,
      email: this.salledesport.email,
      adresse: this.salledesport.adresse,
     
  };
    this.salledesportService.update("SalleDeSport",this.id, c)
      .subscribe(() => {
        // Rediriger vers la liste des types d'abonnements après la modification
        this.router.navigate(['/admin/candidat/salle_de_sports']);
      });
  }

  
}