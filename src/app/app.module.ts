import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {DataTableModule} from "angular-6-datatable";
import { TableComponent } from './table/table.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { KeycloakHttp, KEYCLOAK_HTTP_PROVIDER, keycloakHttpFactory } from './shared/service/keycloak.http';
import { KeycloakService } from './shared/service/keycloak.service';
import { ContractService } from './shared/service/contract.service';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    DataTableModule,
    Ng2SmartTableModule,
    RouterModule.forRoot([
      
      {
        path: 'product',
        component: TableComponent
      },
      {
        path: 'createUser',
        component: UserComponent

      }
    ])
  ],
  providers: [
   {
     provide: KeycloakHttp,
     useFactory:keycloakHttpFactory,
     deps:[XHRBackend,RequestOptions,KeycloakService]
   },
   KeycloakService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
