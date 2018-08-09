import { Contract } from './shared/model/contract.model';
import { ContractService } from './shared/service/contract.service';
import { User } from './shared/model/user.model';
import { KeycloakService } from './shared/service/keycloak.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Headers } from '@angular/http';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import 'datatables.net';
import { KeycloakHttp, KEYCLOAK_HTTP_PROVIDER } from './shared/service/keycloak.http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    users: User[];
    profile: User;
    contracts: Contract[];

    constructor(private keycloakService: KeycloakService ,
                private router: Router ,
                private httpClient:KeycloakHttp) {           
            
   

    }

    public ngOnInit(): void {
        this.profile = this.keycloakService.getUser();
       
      
         
         
        
    }

    public isManager(): boolean {
        return this.keycloakService.hasAnyRole(['manager']);
    }

    public isAdmin(): boolean {
        return this.keycloakService.hasAnyRole(['admin']);
    }

    // public getContracts() {
    //     this.contractService.getContracts().subscribe(
    //         data => {
    //             this.contracts = data;
    //         }
    //     );
    // }

    public getUsers() {
        setTimeout(function () {
            $(function () {
                $('#users').DataTable();
            });
        }, 1000);
        this.httpClient.get('http://localhost:8080/auth/admin/realms/Demo-Realm/users')
        .subscribe(
            data => { this.users = data.json()  },
            err => console.log(err)
        ); 
        /*
         .subscribe(
            (data:User[]) => { 
                //console.log(data['response'].docs[0]);
                this.users = data;
                console.log(this.users);
            }
        ); */ 
    }

    public logout() {
        this.keycloakService.logout();
    }

    public createNewUser(){
       // console.log("jjdhgd");
        this.router.navigate(['createUser']);
    }

    

}
