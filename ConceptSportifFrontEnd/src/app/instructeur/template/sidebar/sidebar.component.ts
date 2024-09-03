import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
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
    { header: 'Candidats',icon:'fa fa-users', content: [
    
      { name: 'Liste des Candidat', href: '/instructeur/candidats' }
    ], expanded: false, rotated: false },
    { header: 'abonnements',icon:'fa fa-usd', content: [
    
      { name: 'Liste des abonnements', href: '/instructeur/vente-abos' },
      { name: 'Ajouter un abonnement', href: '/instructeur/add-vente-abos' }
    ], expanded: false, rotated: false },
    { header: 'Vente produit',icon:'fa fa-usd', content: [
      { name: 'Liste des ventes', href: '/instructeur/vente-prods' },
      { name: 'Ajouter une vente', href: '/instructeur/add-vente-prods' }
    ], expanded: false, rotated: false },
    
     
      { header: 'Cours',icon:'fa fa-users', content: [
        { name: 'Liste cours', href: '/instructeur/cours' }
      ], expanded: false, rotated: false },
      { header: 'Formations',icon:'fa fa-users', content: [
        { name: 'Liste formation', href: '/instructeur/formation' }
      ], expanded: false, rotated: false },
      { header: 'Evénements',icon:'fa fa-users', content: [
        { name: 'Liste événements', href: '/instructeur/evenements' }
      ], expanded: false, rotated: false },
      { header: 'Compte',icon:'fa fa-users', content: [
        { name: 'Liste opperation', href: '/instructeur/compte' }
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