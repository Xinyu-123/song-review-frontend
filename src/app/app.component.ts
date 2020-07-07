import { Component, OnInit } from '@angular/core';
import { HttpService } from './_services/http.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Data } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'library';

  form: FormGroup;
  songs: Data;

  loggedIn: boolean = false;
  constructor(){

  }

  ngOnInit(){

  }

}


