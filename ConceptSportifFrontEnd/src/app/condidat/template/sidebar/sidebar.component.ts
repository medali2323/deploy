import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', overflow: 'hidden' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]

})
export class SidebarComponent {
  items: { header: string,icon:string ,content: any[], expanded: boolean, rotated: boolean }[] = [
    { header: 'Tableau de bord',icon:'fa fa-dashboard', content: [
     
    ], expanded: false, rotated: false },
    { header: 'COURS',icon:'fa fa-users', content: [
    
      { name: 'Liste des cours', href: '/candidat/cours' }
    ], expanded: false, rotated: false },
    { header: 'Formation',icon:'fa fa-users', content: [
    
      { name: 'Liste des Formation', href: '/candidat/formation' }
    ], expanded: false, rotated: false },
  ];
  
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