import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-cours-ala-demande',
  templateUrl: './cours-ala-demande.component.html',
  styleUrls: ['./cours-ala-demande.component.css']
})
export class CoursAlaDemandeComponent {
  @Input() coursalademande!: any ;

}
