import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-cours-presentiel',
  templateUrl: './cours-presentiel.component.html',
  styleUrls: ['./cours-presentiel.component.css']
})
export class CoursPresentielComponent {
  @Input() coursPresentiel!: any ;

}
