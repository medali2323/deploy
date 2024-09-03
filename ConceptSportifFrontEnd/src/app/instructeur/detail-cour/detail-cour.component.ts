import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-detail-cour',
  templateUrl: './detail-cour.component.html',
  styleUrls: ['./detail-cour.component.css']
})
export class DetailCourComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  @ViewChild('userForm') userForm: NgForm | undefined;

  cour: any;
  id: number=0;
  categ_cour:any
  catreps:any
  image:any
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: string='';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courService: HttpService,
    private datePipe: DatePipe

  ) { }
  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  ngOnInit(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
    this._erreur.subscribe(message => this.erreurMessage = message);
    this._erreur.pipe(debounceTime (3000)).subscribe(() => { if (this.selfClosingAlert) { this.selfClosingAlert.close();
    }
    });
	
    this.id = this.route.snapshot.params['id'];
    this.getcour(this.id);
    this.getallcatreps()

  }
  isvideo:boolean=false
  ispresentiel:boolean=false
  isenligne:boolean=false
  changeCateg(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
  
    const match = selectedValue.match(/(\d+)/);
    const number = match ? match[1] : null;
    console.log(number);

    if (number === '1') {
      this.ispresentiel=true
      this.isenligne=false
      this.isvideo=false
    } else if (number === '2') {
      this.isenligne=true
      this.isvideo=false
      this.ispresentiel=false


    } else if (number === '3') {
      this.isvideo=true
      this.ispresentiel=false
      this.isenligne=false

    }
    console.log(this.ispresentiel);
    
  }


  getcour(id: number): void {
    this.courService.getById("Cours",id)
      .subscribe((data) => {
        console.log(data);
        
        this.cour = data;
        this.cour.date=this.formatDate(this.cour.date)

    if (data.categorie_cours.id === 8) {
      this.ispresentiel=true
      this.isenligne=false
      this.isvideo=false
    } else if (data.categorie_cours.id === 9) {
      this.isenligne=true
      this.isvideo=false
      this.ispresentiel=false


    } else if (data.categorie_cours.id === 10) {
      this.isvideo=true
      this.ispresentiel=false
      this.isenligne=false
      let x=this.cour.lienvideo.split("/")
      this.cour.lienvideo=x[x.length-1]
    }
    console.log(this.ispresentiel);
    
      });
  }

  updatecour(): void {
  console.log(this.cour);
  

    this.courService.update("cour",this.id, this.cour)
      .subscribe((R) => {
        console.log(R);
        
        // Rediriger vers la liste des types d'abonnements après la modification
        this._success.next("Le cours  a été Modifié avec succès.");

        this.router.navigate(['instructeur/cours']);
      });
  }
  getallcatreps() {
    this.courService.getAll("Categorie_cours")
    .subscribe((data) => {
      console.log(data);
      
      this.catreps = data;
    });  }
    onSelectFile(event:any) {
      if (event.target.files.length > 0)
      {
        const file = event.target.files[0];
        this.userFile = file;
       // this.f['profile'].setValue(file);
    
      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }
    
      var reader = new FileReader();
      
      this.imagePath = file;
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }
    }
       
        
  }
  submitForm(): void {
     
      
    if (this.ispresentiel) {
      const aux = this.cour;
      aux.instructor={
        id:Number(localStorage.getItem("i"))
      }
      
      aux.categorie_cours={
        id:Number(aux.categorie_cours.id)
      }
   
      aux.LienVideo=null
      aux.LienMeet=null
      console.log(aux);
      this.courService.update('CourPresentiel',this.id, aux).subscribe(
        (coursId) => {
          console.log('Cours ajouté avec succès ! ID du cours :', coursId);
        
  
      
        
        },
        
        (error) => {
          console.error('Erreur lors de l\'ajout du cours :', error);
        }
      );
    }
    if (this.isenligne) {
   
          const aux = this.cour;
          aux.instructor={
            id:Number(localStorage.getItem("i"))
          }
          aux.approuve=false
          aux.categorie_cours={
            id:Number(aux.categorie_cours.id)
          }
         
          console.log(aux);
          this.courService.update('CoursEnLigne',this.id, aux).subscribe(
            (coursId) => {
              console.log('Cours ajouté avec succès ! ID du cours :', coursId);
             

          
            
            },
            
            (error) => {
              console.error('Erreur lors de l\'ajout du cours :', error);
            }
          );
      
    }
    if (this.isvideo) {
      const videoFormData = new FormData();
            console.log(this.userFile);
            
            videoFormData.append('files', this.userFile);
  
            this.courService.uploadVideo3(videoFormData).subscribe(
              (response) => {
                console.log('Vidéo ajoutée avec succès !', response);
                let lien=response.filePath
                const aux = this.cour;
                aux.instructor={
                  id:Number(localStorage.getItem("i"))
                }
                aux.approuve=false
                aux.categorie_cours={
                  id:Number(aux.Categorie_cours)
                }
                aux.lienvideo=lien
                aux.Emplacement=null
                aux.LienMeet=null
                console.log(aux);
                this.courService.update('CourAlaDemande',this.id, aux).subscribe(
                  (coursId) => {
                    console.log('Cours ajouté avec succès ! ID du cours :', coursId);

  
                  
                  },
                  
                  (error) => {
                    console.error('Erreur lors de l\'ajout du cours :', error);
                  }
                );
                
              },
              (error) => {
                console.error('Erreur lors de l\'ajout de la vidéo :', error);
              }
            );
    }
    this._success.next("Le cours  a été Modifié avec succès.");

    setTimeout(() => {
      this.router.navigate(['instructeur/cours']);
    }, 1000);
      
    }
  
}
