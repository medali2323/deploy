import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CandidatsComponent } from './candidats/candidats.component';
import { VenteAbosComponent } from './vente-abos/vente-abos.component';
import { AddVenteAbosComponent } from './add-vente-abos/add-vente-abos.component';
import { AddVenteProdsComponent } from './add-vente-prods/add-vente-prods.component';
import { VenteProdsComponent } from './vente-prods/vente-prods.component';
import { EvennementsComponent } from './evennements/evennements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';
import { authGuard } from '../auth.guard';
import { MaterialModule } from '../material-module';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { ListOperationCompteComponent } from './list-operation-compte/list-operation-compte.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { ListFormationComponent } from './list-formation/list-formation.component';
import { ProfileComponent } from './profile/profile.component';
import { EditCourComponent } from './edit-cour/edit-cour.component';
import { EditformationComponent } from './editformation/editformation.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailCourComponent } from './detail-cour/detail-cour.component';
import { DetailCoursComponent } from '../condidat/detail-cours/detail-cours.component';


const instructeurroutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'candidats', component: CandidatsComponent },
  { path: 'vente-abos', component: VenteAbosComponent },
  { path: 'add-vente-abos', component: AddVenteAbosComponent },
  { path: 'add-vente-prods', component: AddVenteProdsComponent },
  { path: 'vente-prods', component: VenteProdsComponent },
  { path: 'evenements', component: EvennementsComponent },
  {path:"compte",
    component:ListOperationCompteComponent
  }, {path:"cours",
  component:ListCoursComponent
}, 
{path:"cours/:id",
  component:EditCourComponent
},
{path:"cours/detail/:id",
  component:DetailCoursComponent
},
{path:"formation",
component:ListFormationComponent
},
{path:"formation/:id",
component:EditformationComponent
},{
  path:'profile',
  component:ProfileComponent
}
]

@NgModule({
  declarations: [
    DashboardComponent,
    CandidatsComponent,
    VenteAbosComponent,
    AddVenteAbosComponent,
    AddVenteProdsComponent,
    VenteProdsComponent,
    EvennementsComponent,
    SidebarComponent,
    ListOperationCompteComponent,
    ListCoursComponent,
    ListFormationComponent,
    ProfileComponent,
    EditCourComponent,
    EditformationComponent,
    DetailCourComponent,
   
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
    RouterModule.forChild(instructeurroutes),
    SharedModule,
    NgbAlertModule

  ],  // autres imports
  providers: [
    authGuard,  // Assurez-vous que votre authGuard est également fourni ici si nécessaire,
    DatePipe
  ],

})
export class InstructeurModule { }
