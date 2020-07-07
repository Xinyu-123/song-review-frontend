import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Data } from '@angular/router';
import { HttpService } from '../_services/http.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {
  form: FormGroup;
  songs: Data;
  image: File;
  constructor(private http: HttpService, private fb: FormBuilder, public auth: AuthService){

  }

  ngOnInit(){
    this.form = this.fb.group({
      name: '',
      artist: '',
      description: '',
      date: Date,
      date_published: Date,
      image: '',
    })
  }

  selectImage(event){
    console.log(event);
    if(event.target.files.length > 0){
      this.image = <File>event.target.files[0];
    }

    console.log(this.image)
  }

  add_song(info){
    console.log(info);


    this.auth.profile().subscribe(data => {
      const formData = new FormData();
      formData.append('song_image', this.image, this.image.name)
      formData.append('name', info.name);
      formData.append('artist', info.artist);
      formData.append('created_by', data._id);
      if(typeof info.date_published != 'function'){
        formData.append('date_published', info.date_published)
        console.log('data: ' + typeof info.date_published);
      }
        
      info.image = formData;
      this.http.post_song(formData);
    })


  }

  getImage(){
    
  }
}
