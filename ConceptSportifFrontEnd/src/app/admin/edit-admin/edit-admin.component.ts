import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent {
  admin: any;
  id: number=0;
  categ_admin:any
  pays:any
  image:any
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: HttpService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getadmin(this.id);
  }
 


  getadmin(id: number): void {
    this.adminService.getById("admins",id)
      .subscribe((data) => {
        console.log(data);
        
        this.admin = data;
      });
  }

  updateadmin(): void {
    let a={
      adresse:this.admin.adresse,
      email:this.admin.email,
      username:this.admin.username,
      nom:this.admin.nom,
      prenom:this.admin.prenom,
      password:this.admin.password,
      authorities:this.admin.authorities
    }
    console.log(a);

    this.adminService.update("admins",this.id, a)
      .subscribe(() => {
        // Rediriger vers la liste des types d'abonnements après la modification
        this.router.navigate(['/admin/admins/liste']);
      });
  }

}
