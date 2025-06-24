import { CUSTOM_ELEMENTS_SCHEMA, NgModule,APP_INITIALIZER, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/login/login/login.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { PasswordModule } from 'primeng/password';
import { NgxSpinnerModule } from "ngx-spinner";
import { CookieService } from 'ngx-cookie-service';
import { GeneralinterceptorService } from './core/interceptors/generalinterceptor.service';
import { MensajeserrorComponent } from './global/components/mensajeserror/mensajeserror.component';
import { DropdownModule } from 'primeng/dropdown';
import { MatButtonModule } from '@angular/material/button';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { environment } from '../environments/environment'
import { ComponentgeneralComponent } from './global/components/componentgeneral/componentgeneral.component';
import { RouterModule } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.endPointKeycloak,
        realm: environment.realm,
        clientId: environment.clientId,
      },
      initOptions: {
        onLoad: 'check-sso',
        flow:'implicit',
        checkLoginIframe: true,
        silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html'
      },
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorpageComponent,
    ComponentgeneralComponent,
    LoginComponent,
    ErrorpageComponent,
    MensajeserrorComponent,
  ],
  imports: [
    MatMenuModule,
    RouterModule,        // ✅ Puedes agregarlo explícitamente si da error
    BrowserModule,
    CdkTableModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    MatTableModule,
    MatDialogModule,
    DynamicDialogModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    PasswordModule,
    NgxSpinnerModule,
    DropdownModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 2000,
      closeButton: true
    }),
    KeycloakAngularModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    NgbModule,
    Angular2SmartTableModule,
  ],
  providers: [{
      provide: APP_INITIALIZER,
      useClass: GeneralinterceptorService,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    CookieService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
