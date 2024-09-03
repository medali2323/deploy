import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Router } from '@angular/router';
import { HttpService } from '../servises/http.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class FormationComponent  implements OnInit{
  items: { header: string,icon:string ,href:string,content: any[], expanded: boolean, rotated: boolean }[] = [
    { header: 'ACCEUIL',icon:'fa fa-cog',href: '', content: [
      
    ], expanded: false, rotated: false },
    { header: 'À PROPOS',icon:'fa fa-cog',href: '/aprepos', content: [
    
    ], expanded: false, rotated: false },
    { header: 'Cours Locaux',icon:'fa fa-cog',href: '#', content: [
        { name: 'Présentiel', href: '/admin/params/liste_pays' },
        { name: 'Zoom', href: '/admin/params/categ_Instructeur' },
        { name: 'Video à la demande', href: '/admin/params/pourcentages' },
        { name: 'Trouver des insctructeurs', href: '/admin/params/categorie_representant' }
      ], expanded: false, rotated: false },
      { header: 'Formation des instructeurs',icon:'fa fa-cog',href: '#', content: [
        { name: 'Devenir instructeur', href: '/admin/params/liste_pays' },
        { name: 'Trouver une formation', href: '/admin/params/categ_Instructeur' },
       
      ], expanded: false, rotated: false },
      { header: 'Acheter des produits',icon:'fa fa-cog',href: '#', content: [
      
      ], expanded: false, rotated: false },
      { header: 'Contact',icon:'fa fa-cog',href: '#', content: [
      
      ], expanded: false, rotated: false },
    ]
    formation:any=[]
    constructor(private httpservice: HttpService,private router:Router) {}
  
    ngOnInit(): void {
      // Ensure only one accordion section is expanded at a time
      this.items.forEach(item => item.expanded = false);
      this.load();
    }
  
  toggleSection(index: number): void {
    this.items.forEach((item, i) => {
      if (i === index) {
        item.expanded = !item.expanded;
        item.rotated = item.expanded; // Toggle rotation class
      } else {
        item.expanded = false;
        item.rotated = false; // Remove rotation class for other sections
      }
    });
  }
  
  
  rotateIcon(index: number): void {
    this.items.forEach((item, i) => {
      if (i === index) {
        item.rotated = !item.rotated;
      } else {
        item.rotated = false;
      }
    });
  }
  
  isExpanded(index: number): boolean {
    return this.items[index].expanded;
  }
  load(): void {
    this.httpservice.getAll2("global/formation/approuves").subscribe((response: any) => {
      console.log(response);
      this.formation = response;
    }, (error: any) => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }
  demande(){
    
  }
}
