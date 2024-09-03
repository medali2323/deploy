import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashaboardComponent } from './dashaboard/dashaboard.component';
import { ListCoursComponent } from './list-cours/list-cours.component';
import { ListFormationComponent } from './list-formation/list-formation.component';
import { PayerComponent } from './payer/payer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';
import { authGuard } from '../auth.guard';
import { MaterialModule } from '../material-module';
import { SharedModule } from '../shared/shared.module';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import { DetailFormationComponent } from './detail-formation/detail-formation.component';
import { DetailCoursComponent } from './detail-cours/detail-cours.component';
import { CoursEnligneComponent } from './cours-enligne/cours-enligne.component';
import { CourspresentielComponent } from './courspresentiel/courspresentiel.component';
import { CoursalademandeComponent } from './coursalademande/coursalademande.component';
import { FormationalademandeComponent } from './formationalademande/formationalademande.component';
import { FormationpresentielComponent } from './formationpresentiel/formationpresentiel.component';
import { FormationEnligneComponent } from './formation-enligne/formation-enligne.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

const condidatroutes: Routes = [
 {
  path:"dashboard",
  component:DashaboardComponent
 },{
  path:'formation',
  component:ListFormationComponent

 },
 {
  path:'cours',
  component:ListCoursComponent,
  
 },{
  path:'payer/:c/:id',
  component:PayerComponent
 },{
  path:'detailcous/:id',
  component:DetailCoursComponent
 },{
  path:'detailformation/:id',
  component:DetailFormationComponent
 }
]

@NgModule({
  declarations: [
    DashaboardComponent,
    ListCoursComponent,
    ListFormationComponent,
    PayerComponent,
    SidebarComponent,
    DetailFormationComponent,
    DetailCoursComponent,
    CoursEnligneComponent,
    CourspresentielComponent,
    CoursalademandeComponent,
    FormationalademandeComponent,
    FormationpresentielComponent,
    FormationEnligneComponent,
    ProfileComponent
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
    RouterModule.forChild(condidatroutes),
    SharedModule,
    NgbAlert
  ],  // autres imports
  providers: [
    authGuard,  // Assurez-vous que votre authGuard est également fourni ici si nécessaire,
    DatePipe
  ],
})
export class CondidatModule { }
