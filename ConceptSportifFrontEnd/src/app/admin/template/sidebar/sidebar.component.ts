import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] ,
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
    { header: 'Paramétrages globales',icon:'fa fa-cog', content: [
        { name: 'Pays', href: '/admin/params/liste_pays' },
        { name: 'Catégories des instructeurs', href: '/admin/params/categ_Instructeur' },
        { name: 'Pourcentage', href: '/admin/params/pourcentages' },
        { name: 'Catégories des représentants', href: '/admin/params/categorie_representant' }
      ], expanded: false, rotated: false },
    { header: 'Utilisateurs',icon:'fa fa-users', content: [
        { name: 'Administrateurs', href: '/admin/admins/liste' },
        { name: 'Instructeurs', href: '/admin/instructeurs/liste' },
        { name: 'Représentants', href: '/admin/representants/liste' }
      ], expanded: false, rotated: false },
    { header: 'Evénements',icon:'fa fa-users', content: [
        { name: 'Type événement', href: '/admin/Type_evenement' },
        { name: 'Liste événement', href: '/admin/evenement/liste' },
        { name: 'Ajouter événement', href: '/admin/evenement/create' }
      ], expanded: false, rotated: false },
    { header: 'Produits',icon:'fas fa-th-large', content: [
        { name: 'Catégories des produits', href: '/admin/produit/categorie' },
        { name: 'Produits', href: '/admin/produit/produits/liste' }
      ], expanded: false, rotated: false },
    { header: 'Cours',icon:'fas fa-th-large', content: [
        { name: 'Catégories des cours', href: '/admin/categ_cours' },
        { name: 'Liste des cours', href: '/admin/cours' },
        { name: 'Liste des demandes de paticipation aux cours', href: '/admin/demande/cours' }

     
      ], expanded: false, rotated: false },
      
    { header: 'Candidats',icon:'fa fa-users', content: [
        { name: 'Salle de sport', href: '/admin/candidat/salle_de_sports' },
        { name: 'Catégories des candidats', href: '/admin/candidat/categorie' },
        { name: 'Candidats', href: '/admin/candidat/candidats/liste' }
      ], expanded: false, rotated: false },
    { header: 'Formations',icon:'fa fa-users', content: [
        { name: 'Catégories des formations', href: '/admin/categ_formations' },
        { name: 'Formations', href: '/admin/formations' } ,
        { name: 'Liste des demandes de paticipation aux formations', href: '/admin/demande/formation' }

      ], expanded: false, rotated: false },
    { header: 'Abonnements',icon:'fa fa-usd', content: [
        { name: 'Catégories des abonnements', href: '/admin/abonnement/categorie' },
        { name: 'Types des abonnements', href: '/admin/abonnement/type_abonnement/liste' },
        { name: 'Liste des abonnements', href: '/admin/vente_abos/liste' },
        { name: 'Ajouter un abonnement', href: '/admin/vente_abos/create' }
      ], expanded: false, rotated: false },
    { header: 'Vente produit',icon:'fa fa-usd', content: [
        { name: 'Liste des ventes', href: '/admin/vente_prods/liste' },
        { name: 'Ajouter une vente', href: '/admin/vente_prods/create' }
      ], expanded: false, rotated: false },
    { header: 'Stock/Vente',icon:'fa fa-shopping-bag', content: [
        { name: 'Fournisseurs', href: '/admin/stock-vente/Liste_fournisseur' },
        { name: 'Stock', href: '/admin/stock-vente/stock' },
        { name: 'Bon d entrée', href: '/admin/stock-vente/bon_entre/liste' },
        { name: 'Ajouter un bon d entrée', href: '/admin/stock-vente/bon_entre/create' },
        { name: 'Bon de sortie', href: '/admin/stock-vente/bon_sortie/liste' },
        { name: 'Ajouter un bon de sortie', href: '/admin/stock-vente/bon_sortie/create' }
      ], expanded: false, rotated: false },
      { header: 'Comptes',icon:'fa fa-usd', content: [
        { name: 'Liste des comptes', href: '/admin/comptes' }
      ], expanded: false, rotated: false }
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