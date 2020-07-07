import { Component, OnInit, ComponentFactoryResolver, Type,
  ViewChild,
  ViewContainerRef } from '@angular/core';
import { Data } from '@angular/router';
import { HttpService } from '../_services/http.service';
import { AuthService, UserDetails } from '../_services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators'

interface SongDetails {
  name: string,
  artist: string,
  created_by: string,
  date_uploaded: Date,
  rating: number,
  song_image: string,
  _id: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  // Keep track of list of generated components for removal purposes
  components = [];
  form: FormGroup
  songs: Data;
  details: UserDetails;
  constructor(private http: HttpService, public auth: AuthService, private componentFactoryResolver: ComponentFactoryResolver, private fb: FormBuilder){
  }

  ngOnInit(){
    this.get_songs().subscribe((songs: SongDetails[])  => {
      this.songs = songs;
    });

    this.form = this.fb.group({
      search: ''
    })


  }

  get_songs(){
    return this.http.get_songs();
  }

  get_song_image(image){
    return `/api/${image}`
  }


  search_song(){
    console.log(this.form.value);
    this.http.searchSongs(this.form.value.search).subscribe(async (songs: SongDetails[]) => {
      this.songs = songs;
    })
  }


}
