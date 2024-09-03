import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formation-presentiel',
  templateUrl: './formation-presentiel.component.html',
  styleUrls: ['./formation-presentiel.component.css']
})
export class FormationPresentielComponent {
  @Input() formationPresentiel!: any ;

}
