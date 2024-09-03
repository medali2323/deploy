import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formation-en-lingne',
  templateUrl: './formation-en-lingne.component.html',
  styleUrls: ['./formation-en-lingne.component.css']
})
export class FormationEnLingneComponent {
  @Input() formationEnLigne!: any ;

}
