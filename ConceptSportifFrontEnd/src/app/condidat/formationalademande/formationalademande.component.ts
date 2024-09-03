import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-formationalademande',
  templateUrl: './formationalademande.component.html',
  styleUrls: ['./formationalademande.component.css']
})
export class FormationalademandeComponent {

  @Input() formationalademande!: any ;
  @Output() demandeEvent = new EventEmitter<any>();
  demande(item:any){
    this.demandeEvent.emit(item);

  }
}
