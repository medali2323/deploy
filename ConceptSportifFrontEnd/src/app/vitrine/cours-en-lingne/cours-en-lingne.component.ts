import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/servises/http.service';

@Component({
  selector: 'app-cours-en-lingne',
  templateUrl: './cours-en-lingne.component.html',
  styleUrls: ['./cours-en-lingne.component.css']
})
export class CoursEnLingneComponent {
  @Input() CoursEnLigne!: any ;

  


}
