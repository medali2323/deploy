import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-formation-ala-demande',
  templateUrl: './formation-ala-demande.component.html',
  styleUrls: ['./formation-ala-demande.component.css']
})
export class FormationAlaDemandeComponent {
  @Input() formationalademande!: any ;

}
