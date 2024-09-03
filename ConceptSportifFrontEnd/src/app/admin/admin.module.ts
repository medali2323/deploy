import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DeviceManagementComponentComponent } from './device-management-component/device-management-component.component';
import { UserManagementComponentComponent } from './user-management-component/user-management-component.component';
import { AdminDashboardComponentComponent } from './admin-dashboard-component/admin-dashboard-component.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { authGuard } from '../auth.guard';
import { MaterialModule } from '../material-module';
import { PopupComponent } from './popup/popup.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { ParamsComponent } from './params/params.component';
import { InstrectorComponent } from './instrector/instrector.component';
import { ListePaysComponent } from './liste-pays/liste-pays.component';
import { ListeCategorieInstructeurComponent } from './liste-categorie-instructeur/liste-categorie-instructeur.component';
import { PourcentagesComponent } from './pourcentages/pourcentages.component';
import { ListeCategorieRepresentantComponent } from './liste-categorie-representant/liste-categorie-representant.component';
import { ListeAdminsComponent } from './liste-admins/liste-admins.component';
import { ListeInstructeursComponent } from './liste-instructeurs/liste-instructeurs.component';
import { ListeRepresentantsComponent } from './liste-representants/liste-representants.component';
import { ListeCategProdComponent } from './liste-categ-prod/liste-categ-prod.component';
import { ListeProduitsComponent } from './liste-produits/liste-produits.component';
import { ListeCategCoursComponent } from './liste-categ-cours/liste-categ-cours.component';
import { ListeSalleDeSportsComponent } from './liste-salle-de-sports/liste-salle-de-sports.component';
import { ListeCategCondidatComponent } from './liste-categ-condidat/liste-categ-condidat.component';
import { ListeCondidatsComponent } from './liste-condidats/liste-condidats.component';
import { ListeCategFormationComponent } from './liste-categ-formation/liste-categ-formation.component';
import { ListeCategAbonnementsComponent } from './liste-categ-abonnements/liste-categ-abonnements.component';
import { ListeTypeAbonnementsComponent } from './liste-type-abonnements/liste-type-abonnements.component';
import { VenteProdsComponent } from './vente-prods/vente-prods.component';
import { AddVenteProdsComponent } from './add-vente-prods/add-vente-prods.component';
import { SublevelMenuComponent } from './template/sidebar/sublevel-menu.component';
import { ListeCategEvenementComponent } from './liste-categ-evenement/liste-categ-evenement.component';
import {DataTablesModule} from 'angular-datatables';
import { EditTypeAbonnementsComponent } from './edit-type-abonnements/edit-type-abonnements.component';
import { EditInstrictorComponent } from './edit-instrictor/edit-instrictor.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { EditRepresantantComponent } from './edit-represantant/edit-represantant.component';
import { ListVenteAbonnementComponent } from './list-vente-abonnement/list-vente-abonnement.component';
import { AjouterVenteAbonnementComponent } from './ajouter-vente-abonnement/ajouter-vente-abonnement.component';
import { EditProduitComponent } from './edit-produit/edit-produit.component';
import { EditCondidatComponent } from './edit-condidat/edit-condidat.component';
import { ListFournisseurComponent } from './list-fournisseur/list-fournisseur.component';
import { ListStockComponent } from './list-stock/list-stock.component';
import { ListBonEntreComponent } from './list-bon-entre/list-bon-entre.component';
import { AjouterBonEntreComponent } from './ajouter-bon-entre/ajouter-bon-entre.component';
import { EditBonEntreeComponent } from './edit-bon-entree/edit-bon-entree.component';
import { EditSalledesportComponent } from './edit-salledesport/edit-salledesport.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { ListFormationComponent } from './list-formation/list-formation.component';
import { DetailFormationComponent } from './detail-formation/detail-formation.component';
import { AddInstructorToFormationComponent } from './add-instructor-to-formation/add-instructor-to-formation.component';
import { AjouterBonSortieComponent } from './ajouter-bon-sortie/ajouter-bon-sortie.component';
import { ListBonSortieComponent } from './list-bon-sortie/list-bon-sortie.component';
import { EditBonSprtieComponent } from './edit-bon-sprtie/edit-bon-sprtie.component';
import { ListCompteComponent } from './list-compte/list-compte.component';
import { ListOperationCompteComponent } from './list-operation-compte/list-operation-compte.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ListEvenementComponent } from './list-evenement/list-evenement.component';
import { AddEvenementComponent } from './add-evenement/add-evenement.component';
import { JitsiComponent } from './jitsi/jitsi.component';
import { ListcoursComponent } from './listcours/listcours.component';
import { ListDemandeComponent } from './list-demande/list-demande.component';
import { ProfileComponent } from './profile/profile.component';
import { DecimalPipe } from '../decimal.pipe';
import { TokenInterceptor } from '../services/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


const adminroutes: Routes = [
  {
    path:'dashboard',
    component:AdminDashboardComponentComponent,
    canActivate: [authGuard]
  },

  {
    path:'params',
    children:[
      {
        path:'liste_pays',
        component:ListePaysComponent
      },{
        path:'categ_Instructeur',
        component:ListeCategorieInstructeurComponent
      },
      {
        path:'pourcentages',component:PourcentagesComponent
      },
      {
        path:'categorie_representant',
        component:ListeCategorieRepresentantComponent
      },
    ]
  },
  {
    path:'admins',
    children:[
      {  path:'liste',
      component:ListeAdminsComponent,},
      {
        path:'edit/:id',
        component:EditAdminComponent
      }
    ]
  },
  {
    path:'instructeurs',
    children:[
      {
        path:'liste',
        component:ListeInstructeursComponent,
      },
      {
        path:'edit/:id',
        component:EditInstrictorComponent
      }
    ]
  }, {
    path:'representants',
    children:[
      {
        path:'liste',
        component:ListeRepresentantsComponent,
      },
      {
        path:'edit/:id',
        component:EditRepresantantComponent
      }
    ]
  },
  {
    path:'Type_evenement',
    component:ListeCategEvenementComponent
  },            
  {
      path:"produit",
      
      children:[
        {
          path:'categorie',
          component:ListeCategProdComponent
         } ,
         {
            path:'produits',
            children:[
              {
                path:"liste",
                component:ListeProduitsComponent,
              },
              {
                path:'edit/:id',component:EditProduitComponent
              },
            ]
         }
        
    ,
      ]
    },
    {
      path:'categ_formations',
      component:ListeCategFormationComponent
    },
    {
      path:'formations',
      component:ListFormationComponent
    }, {
      path:'formations/:id',
      component:DetailFormationComponent
    },
    {
      path:'categ_cours',
      component:ListeCategCoursComponent
    },  {
      path:'cours',
      component:ListcoursComponent
    },
    {
      path:'demande/:c',
      component:ListDemandeComponent
    },
    {
      path:'vente_abos',
      children:[
       
        {
          path:'liste',component:ListVenteAbonnementComponent,

        },
        {
          path:'create',component:AjouterVenteAbonnementComponent
        }
      ]
    },
 {
  
      path:'candidat',
      children:[
        {
          path:'salle_de_sports',component:ListeSalleDeSportsComponent
        },
        {
          path:'salle_de_sports/edit/:id',component:EditSalledesportComponent
        },
        {
          path:'categorie',component:ListeCategCondidatComponent
        },
        {

          path:'candidats',
          children:[
            {
              path:'liste',component:ListeCondidatsComponent,
    
            },
            {
              path:'edit/:id',component:EditCondidatComponent
            },
          ]
        }
       
      
      ]
    },
    {
      path:'stock-vente',
      children:[
    { path: 'Liste_fournisseur', component: ListFournisseurComponent }, 
    { path: 'stock', component: ListStockComponent }, 

    {
      path:'bon_entre',
      children:[
    { path: 'liste', component: ListBonEntreComponent }, 
    { path: 'create', component: AjouterBonEntreComponent }, 
    { path: 'edit/:id', component: EditBonEntreeComponent },
      ]
    } ,
    {
      path:'bon_sortie',
      children:[
    { path: 'liste', component: ListBonSortieComponent }, 
    { path: 'create', component: AjouterBonSortieComponent }, 
    { path: 'edit/:id', component: EditBonSprtieComponent },
      ]
    } 
      ]
    }
,    {
  path:'vente_prods',
  children:[
    { path: 'liste', component: VenteProdsComponent }, 
    { path: 'create', component: AddVenteProdsComponent }, 
  ]
},
{
  path:'abonnement',
  children:[
    {
      path:'type_abonnement',
      children:[
        {
          path:'liste',
          component:ListeTypeAbonnementsComponent,
        },
        {
          path:'edit/:id',
          component:EditTypeAbonnementsComponent
        }
      ]
    },
    {
      path:'categorie',
      component:ListeCategAbonnementsComponent
    },
  ]
},
{
  path:'comptes',
  component:ListCompteComponent
},{
  path:'comptes/operations/:id',
  component:ListOperationCompteComponent
},
{
  path:'evenement',
  children:[
   
    {
      path:'liste',component:ListEvenementComponent,

    },
    {
      path:'create',component:AddEvenementComponent
    }
  ]
},{
  path:'JitsiComponent',component:JitsiComponent
},{
  path:'profile',component:ProfileComponent
}
    
    ];

    
@NgModule({
  declarations: [
    DeviceManagementComponentComponent,
    UserManagementComponentComponent,
    AdminDashboardComponentComponent,
    SidebarComponent,
  
    PopupComponent,
    ParamsComponent,
    InstrectorComponent,
    ListePaysComponent,
    ListeCategorieInstructeurComponent,
    PourcentagesComponent,
    ListeCategorieRepresentantComponent,
    ListeAdminsComponent,
    ListeInstructeursComponent,
    ListeRepresentantsComponent,
    ListeCategProdComponent,
    ListeProduitsComponent,
    ListeCategCoursComponent,
    ListeSalleDeSportsComponent,
    ListeCategCondidatComponent,
    ListeCondidatsComponent,
    ListeCategFormationComponent,
    ListeCategAbonnementsComponent,
    ListeTypeAbonnementsComponent,
    VenteProdsComponent,
    AddVenteProdsComponent,
    SublevelMenuComponent,
    ListeCategEvenementComponent,
    EditTypeAbonnementsComponent,
    EditInstrictorComponent,
    EditAdminComponent,
    EditRepresantantComponent,
    ListVenteAbonnementComponent,
    AjouterVenteAbonnementComponent,
    EditProduitComponent,
    EditCondidatComponent,
    ListFournisseurComponent,
    ListStockComponent,
    ListBonEntreComponent,
    AjouterBonEntreComponent,
    EditBonEntreeComponent,
    EditBonSprtieComponent,
    EditSalledesportComponent,
    ListFormationComponent,
    DetailFormationComponent,
    AddInstructorToFormationComponent,
    AjouterBonSortieComponent,
    ListBonSortieComponent,
    ListOperationCompteComponent,
    ListCompteComponent,
    ListEvenementComponent,
    AddEvenementComponent,
    JitsiComponent,
    ListcoursComponent,
    ListDemandeComponent,
    ProfileComponent,
    DecimalPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
   MaterialModule,
   FormsModule,
   ReactiveFormsModule,
   DataTablesModule,
   ReactiveFormsModule ,
   FontAwesomeModule,
    RouterModule.forChild(adminroutes),
    SharedModule,
    NgbAlertModule
  ],  // autres imports
  providers: [
    authGuard,  // Assurez-vous que votre authGuard est également fourni ici si nécessaire,
    DatePipe,
  
  ],

})
export class AdminModule { }
