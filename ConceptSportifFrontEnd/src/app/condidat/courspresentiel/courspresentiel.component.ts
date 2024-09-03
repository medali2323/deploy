import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-courspresentiel',
  templateUrl: './courspresentiel.component.html',
  styleUrls: ['./courspresentiel.component.css']
})
export class CourspresentielComponent {

  @Input() coursPresentiel!: any ;
  @Output() demandeEvent = new EventEmitter<any>();
  demande(item:any){
    this.demandeEvent.emit(item);

  }
}
