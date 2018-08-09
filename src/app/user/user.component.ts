import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../shared/service/keycloak.service';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { User } from '../shared/model/user.model';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { KeycloakHttp } from '../shared/service/keycloak.http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 // user:User;
  model:any={};
  emailPattern = "^[a-z0-90._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private keycloakService: KeycloakService,
    private httpClient:KeycloakHttp) {
      $( document ).ready(function() {
        $("#password").on("focusout", function (e) {
            if ($(this).val() != $("#passwordConfirm").val()) {
                $("#passwordConfirm").removeClass("valid").addClass("invalid");
            } else {
                $("#passwordConfirm").removeClass("invalid").addClass("valid");
            }
        });
      
        $("#passwordConfirm").on("keyup", function (e) {
            if ($("#password").val() != $(this).val()) {
                $(this).removeClass("valid").addClass("invalid");
            } else {
                $(this).removeClass("invalid").addClass("valid");
            }
        });
      });
     }

  ngOnInit() {
    //this.resetForm()
    
  }

  onSubmit(){

    //alert(JSON.stringify(this.model.username));

    // create new user
    this.httpClient.post('http://localhost:8080/auth/admin/realms/Demo-Realm/users?realm=Demo-Realm',
    {
    "username" : this.model.username, 
    "enabled": true, 
    "email" : this.model.email, 
    "firstName": this.model.firstName, 
    "lastName": this.model.lastName, 
    "credentials" : [{ "type" : "password", "value" : this.model.password } ], 
    "realmRoles": [ "user", "offline_access"  ], 
    "clientRoles": {"account": [ "manage-account" ] } 
    })
    .subscribe(
    res => {
      return  console.log("done"+res);
    },
    err => {
      return  console.log(err.message);
    }
    );
   // this.resetForm();
  }

  // resetForm(form?:NgForm){
  //   if(form != null){
  //     form.reset();
  //     this.model={};
     
  //   }

  // }
  

}
