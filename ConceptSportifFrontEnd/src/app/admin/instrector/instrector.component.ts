import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-instrector',
  templateUrl: './instrector.component.html',
  styleUrls: ['./instrector.component.css']
})
export class InstrectorComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  
  
    instrectors: any = [];
    dataSource = new MatTableDataSource<any>();
    displayedColumns = ['id','profession', 'commentaire', 'sexe','dateNaissance','cin','details','modifier','supprimer'];
    editdata:any={}
    @ViewChild(MatPaginator) paginator!: MatPaginator;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
    }
  deleteid:any
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    constructor(private http: HttpService, private router: Router,private modalService: NgbModal) {}
  
    ngOnInit(): void {
      this.getinstrector();
    }
  
    getinstrector() {
      this.http.getAll("Instructor").subscribe(
        (response) => {
          this.instrectors = response;
          this.dataSource.data = this.instrectors;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
    detail(e:any){
  
    }
    openEdit(targetModal: any, data: any) {
      this.modalService.open(targetModal, {
        backdrop: 'static',
        size: 'lg'
      });
      this.setpopupdata(data)
    }
    supprumer(targetModal: any, data: any) {
      this.modalService.open(targetModal, {
        backdrop: 'static',
        size: 'lg'
      });
      this.deleteid=data._id
    }
    open(content:any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this['closeResult'] = `Closed with: ${result}`;
      }, (reason) => {
        this['closeResult'] = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    setpopupdata(data: any) {
      console.log(data);
      
     this.http.getById("Instructor",data._id).subscribe(res=>{
      console.log(res);
      
      this.editdata = res;
      this.editdata.startTime= this.formatDate(this.editdata.startTime)// Adjust format as needed
      this.editdata.endTime= this.formatDate(this.editdata.endTime)// Adjust format as needed
  
     })
    }
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }
    onSubmit(f:NgForm){
      console.log('Username:', f.value.zone);
      console.log('startTime:', f.value.startTime);
      const data = {
        zone:f.value.zone,
        startTime: f.value.startTime,
        endTime:f.value.endTime
      };
      this.http.create('Instructor',data).subscribe(
        (response) => {
          console.log('instrector successful:', response);
          this.modalService.dismissAll();
          this.getinstrector()
        },
        (error) => {
          console.error('instrector error:', error);
        }
      );
    }
    onedit(f:NgForm){
      console.log('Username:', f.value.zone);
      console.log('startTime:', f.value.startTime);
      const data = {
        zone:f.value.zone,
        startTime: f.value.startTime,
        endTime:f.value.endTime
  
      };
      this.http.update('Instructor',this.editdata._id,data).subscribe(
        (response) => {
          console.log('instrector successful:', response);
          this.modalService.dismissAll();
          this.getinstrector()
        },
        (error) => {
          console.error('instrector error:', error);
        }
      );
    }
    private formatDate(dateString: string): string {
      const [datePart, timePart] = dateString.split('T');
      const [year, month, day] = datePart.split('-');
      const [hour, minute] = timePart.split(':');
  
      // Creating a new Date object with components
      const dateObject = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
  
      // Formatting for the datetime-local input
      const formattedDate = dateObject.toISOString().slice(0, 16);
  
      return formattedDate;
    }
    delete(){
      this.http.delete('instrector',this.deleteid).subscribe(
        (response) => {
          console.log('instrector successful:', response);
          this.modalService.dismissAll();
          this.getinstrector()
        },
        (error) => {
          console.error('instrector error:', error);
        }
      );
    }
  }