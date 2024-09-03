import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Subject, debounceTime } from 'rxjs';
import { HttpService } from 'src/app/servises/http.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-editformation',
  templateUrl: './editformation.component.html',
  styleUrls: ['./editformation.component.css']
})
export class EditformationComponent {
  @ViewChild(AlertComponent) alertComponent: AlertComponent | undefined;
  private _success = new Subject<string>();
  private _erreur = new Subject<string>();
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert | undefined;
  successMessage:any=''
  erreurMessage:any=''
  
  @ViewChild('userForm') userForm: NgForm | undefined;

  formation: any;
  id: number=0;
  categ_formation:any
  catreps:any
  image:any
  userFile :any;
  public imagePath:any;
  imgURL: any;
  message: string='';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formationService: HttpService,
    private datePipe: DatePipe
  ) { }

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
    this.getformation(this.id);
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


  getformation(id: number): void {
    this.formationService.getById("formation",id)
      .subscribe((data) => {
        console.log(data);
        
        this.formation = data;
        this.formation.date=this.formatDate(this.formation.date)
        console.log(this.formation.date);
    if (data.categ_formation.id === 4) {
      this.ispresentiel=true
      this.isenligne=false
      this.isvideo=false
    } else if (data.categ_formation.id === 5) {
      this.isenligne=true
      this.isvideo=false
      this.ispresentiel=false


    } else if (data.categ_formation.id === 6) {
      this.isvideo=true
      this.ispresentiel=false
      this.isenligne=false

    }
    console.log(this.ispresentiel);
    
      });
  }

  updateformation(): void {
  console.log(this.formation);
  

    this.formationService.update("formation",this.id, this.formation)
      .subscribe((R) => {
        console.log(R);
        
        // Rediriger vers la liste des types d'abonnements après la modification
        this._success.next("Le formations  a été Modifié avec succès.");

        this.router.navigate(['instructeur/formations']);
      });
  }
  getallcatreps() {
    this.formationService.getAll("categ_formation")
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
  formatDate(date: string): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  submitForm(): void {
     
      
    if (this.ispresentiel) {
      const aux = this.formation;
      aux.instructor={
        id:Number(localStorage.getItem("i"))
      }
      
      aux.categ_formation={
        id:Number(aux.categ_formation.id)
      }
   
      aux.LienVideo=null
      aux.LienMeet=null
      console.log(aux);
      this.formationService.update('FormationPresentiel',this.id, aux).subscribe(
        (formationsId) => {
          console.log('formations ajouté avec succès ! ID du formations :', formationsId);
        
  
      
        
        },
        
        (error) => {
          console.error('Erreur lors de l\'ajout du formations :', error);
        }
      );
    }
    if (this.isenligne) {
   
          const aux = this.formation;
          aux.instructor={
            id:Number(localStorage.getItem("i"))
          }
          aux.approuve=false
          aux.categ_formation={
            id:Number(aux.categ_formation.id)
          }
         
          console.log(aux);
          this.formationService.update('FormationEnLigne',this.id, aux).subscribe(
            (formationsId) => {
              console.log('formations ajouté avec succès ! ID du formations :', formationsId);
             

          
            
            },
            
            (error) => {
              console.error('Erreur lors de l\'ajout du formations :', error);
            }
          );
      
    }
    if (this.isvideo) {
      const videoFormData = new FormData();
            console.log(this.userFile);
            
            videoFormData.append('files', this.userFile);
  
            this.formationService.uploadVideo3(videoFormData).subscribe(
              (response) => {
                console.log('Vidéo ajoutée avec succès !', response);
                let lien=response.filePath
                const aux = this.formation;
                aux.instructor={
                  id:Number(localStorage.getItem("i"))
                }
                aux.approuve=false
                aux.categ_formation={
                  id:Number(aux.categ_formation)
                }
                aux.lienvideo=lien
                aux.Emplacement=null
                aux.LienMeet=null
                console.log(aux);
                this.formationService.update('FormationAlaDemande',this.id, aux).subscribe(
                  (formationsId) => {
                    console.log('formations ajouté avec succès ! ID du formations :', formationsId);

  
                  
                  },
                  
                  (error) => {
                    console.error('Erreur lors de l\'ajout du formations :', error);
                  }
                );
                
              },
              (error) => {
                console.error('Erreur lors de l\'ajout de la vidéo :', error);
              }
            );
    }
    this._success.next("La formations  a été Modifié avec succès.");

    setTimeout(() => {
      this.router.navigate(['instructeur/formation']);
    }, 1000);
      
    }
  
}
