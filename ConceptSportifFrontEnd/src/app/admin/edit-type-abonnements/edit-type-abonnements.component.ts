import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';
@Component({
  selector: 'app-edit-type-abonnements',
  templateUrl: './edit-type-abonnements.component.html',
  styleUrls: ['./edit-type-abonnements.component.css']
})
export class EditTypeAbonnementsComponent {
  typeAbonnement: any;
  id: number=0;
  Categ_abonnement:any
  selectedCategAbonnementId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private typeAbonnementService: HttpService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getTypeAbonnement(this.id);
    this.getallCateg_abonnement();
  }

  getTypeAbonnement(id: number): void {
    this.typeAbonnementService.getById("TypeAbonnement",id)
      .subscribe((data) => {
        this.typeAbonnement = data;
        this.selectedCategAbonnementId=data.categ_abonnement.id

      });
  }

  updateTypeAbonnement(): void {
    console.log(this.typeAbonnement);
    let c: any = {
      code: this.typeAbonnement.code,
      description: this.typeAbonnement.description,
      nembre_mois: Number(this.typeAbonnement.nembre_mois),
      taux_tva: Number(this.typeAbonnement.taux_tva),
      prix_u_ht: Number(this.typeAbonnement.prix_u_ht),
      prix_u_ttc:Number( this.typeAbonnement.prix_u_ttc),
      categ_abonnement: {
          id: this.selectedCategAbonnementId,
      },
  };
    this.typeAbonnementService.update("TypeAbonnement",this.id, c)
      .subscribe(() => {
        // Rediriger vers la liste des types d'abonnements après la modification
        this.router.navigate(['/admin/abonnement/type_abonnement/liste']);
      });
  }
  getallCateg_abonnement(): void {
    this.typeAbonnementService.getAll("categ_abonnement").subscribe((response: any) => {
      console.log(response);
      
      this.Categ_abonnement = response;
   
    });
  }
}