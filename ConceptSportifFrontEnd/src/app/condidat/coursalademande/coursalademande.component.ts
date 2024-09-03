import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-coursalademande',
  templateUrl: './coursalademande.component.html',
  styleUrls: ['./coursalademande.component.css']
})
export class CoursalademandeComponent {

  @Input() coursalademande!: any ;
  @Output() demandeEvent = new EventEmitter<any>();
  demande(item:any){
    this.demandeEvent.emit(item);

  }
}
