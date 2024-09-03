import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class NavComponent {

  items: { header: string,icon:string ,href:string,content: any[], expanded: boolean, rotated: boolean }[] = [
    { header: 'ACCUEIL',icon:'fa fa-cog',href: '', content: [
      

    ], expanded: false, rotated: false },
    { header: 'À PROPOS',icon:'fa fa-cog',href: '/aprepos', content: [
    
    ], expanded: false, rotated: false },
    { header: 'Cours Locaux',icon:'fa fa-cog',href: '#', content: [
        { name: 'Présentiel', href: '/cours/inPerson' },
        { name: 'Zoom', href: '/cours/zoom' },
        { name: 'Video à la demande', href: '/cours/onDemand' },
        { name: 'Trouver des insctructeurs', href: '#' }
      ], expanded: false, rotated: false },
      { header: 'Formation des instructeurs',icon:'fa fa-cog',href: '#', content: [
        { name: 'Devenir instructeur', href: '/admin/params/liste_pays' },
        { name: 'Trouver une formation', href: 'formation' },
       
      ], expanded: false, rotated: false },
      { header: 'Acheter des produits',icon:'fa fa-cog',href: '#', content: [
      
      ], expanded: false, rotated: false },
      { header: 'Contact',icon:'fa fa-cog',href: '#', content: [
      
      ], expanded: false, rotated: false },
    ]
    ngOnInit(): void {
      // Ensure only one accordion section is expanded at a time
      this.items.forEach(item => item.expanded = false);
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
  
}