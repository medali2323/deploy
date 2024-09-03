import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cours-enligne',
  templateUrl: './cours-enligne.component.html',
  styleUrls: ['./cours-enligne.component.css']
})
export class CoursEnligneComponent {

  @Input() CoursEnLigne!: any ;
  @Output() demandeEvent = new EventEmitter<any>();
  demande(item:any){
    this.demandeEvent.emit(item);

  }
}
