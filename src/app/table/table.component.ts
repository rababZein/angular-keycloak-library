import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Table } from './Table';
import * as $ from 'jquery';
import 'datatables.net';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  characters: Table[];
  constructor(private httpClient:HttpClient) { 
    this.httpClient.get('http://localhost:8983/solr/delta13/dataimport?command=delta-import')
                    .subscribe()  ;
    this.httpClient.get('http://localhost:8983/solr/delta13/select?q=*:*')
                    .subscribe(
                      (data:Table[]) => { 
                        //console.log(data['response'].docs[0]);
                        this.characters = data['response'].docs;
                       // console.log('hello'+this.characters);
                    })  ;
   
  }
  
  
  

  ngOnInit() {

 

    setTimeout(function () {
      $(function () {
        $('#example').DataTable();
      });
    }, 3000);

   
   
  }
  

}
