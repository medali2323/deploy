import { Component, Inject, Input, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/servises/http.service';
import { NgxMatDatepickerPanel, NgxMatDatepickerControl } from "@angular-material-components/datetime-picker";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @ViewChild('endTimePicker') endTimePicker: NgxMatDatepickerPanel<NgxMatDatepickerControl<any>, any, any> | undefined;
  @Input() isEditMode: boolean = false; 
  inputdata: any;
  editdata: any;
  closemessage = 'closed using directive'
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupComponent>, private buildr: FormBuilder,
    private service: HttpService) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if(this.inputdata.code!=0){
      this.setpopupdata(this.inputdata)
    }
  }

  setpopupdata(data: any) {
    console.log(data);
    
   this.service.getById("HorairesEclairage",data.code).subscribe(res=>{
    console.log(res);
    
    this.editdata = res;
    this.myform.setValue({zone:this.editdata.zone,startTime:this.editdata.startTime,endTime:this.editdata.endTime})
   })
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  myform = this.buildr.group({
    zone: this.buildr.control(''),
    endTime: this.buildr.control(''),
    startTime: this.buildr.control(''),
  });

  Saveuser() {
    this.service.create("HoraireEclairage",this.myform.value).subscribe(res => {
      this.closepopup();
    });
  }
}
