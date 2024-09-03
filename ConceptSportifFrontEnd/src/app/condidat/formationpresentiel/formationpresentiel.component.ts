import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-formationpresentiel',
  templateUrl: './formationpresentiel.component.html',
  styleUrls: ['./formationpresentiel.component.css']
})
export class FormationpresentielComponent {
  @Input() formationPresentiel!: any ;
  @Output() demandeEvent = new EventEmitter<any>();
  demande(item:any){
    this.demandeEvent.emit(item);

  }
}
