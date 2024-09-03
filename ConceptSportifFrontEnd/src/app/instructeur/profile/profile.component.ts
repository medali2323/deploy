import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  id: any;
  categ_user:any
  pays:any
  image:any
  selectedCateguserId: number | null = null;
  selectedPaysId: number | null = null;
  constructor(
    private router: Router,
    private userService: HttpService
  ) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("i")
    this.getuser(this.id);
    this.getallcateg_user();
    this.getallpays();
    this.getimages()
  }
  getimages() {
    this.userService.getimageiById("Instructor/Imgageinstricteur",this.id)
    .subscribe((data) => {
      console.log(data);
      
      this.image = data;
    });
  }
  getallpays() {
    this.userService.getAll("Pays")
    .subscribe((data) => {
      console.log(data);
      
      this.pays = data;
    });  }

  getuser(id: number): void {
    this.userService.getById("Instructor",id)
      .subscribe((data) => {
        console.log(data);
        
        this.user = data;
        this.selectedCateguserId=data.categuser.id
        this.selectedPaysId=data.pays.id
      });
  }

  updateuser(): void {
    let i: any = {
      username: this.user.username,
      email: this.user.email,
      nom: this.user.nom,
      prenom: this.user.prenom,
      adresse: this.user.adresse,
      tel: this.user.tel,
      profession: this.user.profession,
      commentaire: this.user.commentaire,
      sexe: this.user.sexe,
      dateNaissance: this.user.dateNaissance,
      filename: this.user.filename,
      cin: this.user.cin,
     
  };
  
  // Utilisation de l'objet créé pour l'user
  console.log(i);
  
    this.userService.update("admins",this.id, i)
      .subscribe(() => {
        // Rediriger vers la liste des types d'abonnements après la modification
        this.router.navigate(['/admin/dashboard']);
      });
  }
  getallcateg_user(): void {
    this.userService.getAll("categ_user").subscribe((response: any) => {
      console.log(response);
      
      this.categ_user = response;
   
    });
  }
}
