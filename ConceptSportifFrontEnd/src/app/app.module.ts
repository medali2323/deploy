import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from './material-module';
import { CoursPresentielComponent } from './vitrine/cours-presentiel/cours-presentiel.component';
import { CoursEnLingneComponent } from './vitrine/cours-en-lingne/cours-en-lingne.component';
import { CoursAlaDemandeComponent } from './vitrine/cours-ala-demande/cours-ala-demande.component';
import { FormationAlaDemandeComponent } from './vitrine/formation-ala-demande/formation-ala-demande.component';
import { FormationEnLingneComponent } from './vitrine/formation-en-lingne/formation-en-lingne.component';
import { FormationPresentielComponent } from './vitrine/formation-presentiel/formation-presentiel.component';
import { NavComponent } from './vitrine/template/nav/nav.component';
import { FooterComponent } from './vitrine/template/footer/footer.component';
import { AcceilComponent } from './vitrine/acceil/acceil.component';
import { ApreposComponent } from './vitrine/aprepos/aprepos.component';
import { CoursComponent } from './vitrine/cours/cours.component';
import { FormationComponent } from './vitrine/formation/formation.component';
import { TokenInterceptor } from './services/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    AcceilComponent,
    FormationComponent,
    ApreposComponent,
    CoursPresentielComponent,
    CoursEnLingneComponent,
    CoursAlaDemandeComponent,
    FormationAlaDemandeComponent,
    FormationEnLingneComponent,
    FormationPresentielComponent,
    NavComponent,
    FooterComponent,
    CoursComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
  //  SharedModule
  CommonModule,
  FormsModule,
 MaterialModule,
 FormsModule,
 ReactiveFormsModule,
 DataTablesModule,
 ReactiveFormsModule ,
 FontAwesomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
