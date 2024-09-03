import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceilComponent } from './vitrine/acceil/acceil.component';
import { ApreposComponent } from './vitrine/aprepos/aprepos.component';
import { FormationComponent } from './vitrine/formation/formation.component';
import { CoursComponent } from './vitrine/cours/cours.component';
import { CoursEnLingneComponent } from './vitrine/cours-en-lingne/cours-en-lingne.component';
import { CoursAlaDemandeComponent } from './vitrine/cours-ala-demande/cours-ala-demande.component';
import { CoursPresentielComponent } from './vitrine/cours-presentiel/cours-presentiel.component';


const routes: Routes = [
  {
    path:'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'instructeur',
    loadChildren: () => import('./instructeur/instructeur.module').then(m => m.InstructeurModule),
  },
  {
    path:'candidat',
    loadChildren: () => import('./condidat/condidat.module').then(m => m.CondidatModule),
  },
  {
    path:'',
    component:AcceilComponent
  },
  {
    path:'aprepos',
    component:ApreposComponent
  },
  {
    path:'formation',
    component:FormationComponent
  }, {
    path:'cours/:type',
    component:CoursComponent
  },
 
  ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
