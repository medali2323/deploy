import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-formation-enligne',
  templateUrl: './formation-enligne.component.html',
  styleUrls: ['./formation-enligne.component.css']
})
export class FormationEnligneComponent {
  @Input() formationEnLigne!: any ;
  @Output() demandeEvent = new EventEmitter<any>();
  demande(item:any){
    this.demandeEvent.emit(item);
  }
}