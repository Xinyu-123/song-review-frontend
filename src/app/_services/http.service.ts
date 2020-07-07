import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Identifiers } from '@angular/compiler';
import { AuthService, TokenPayload, TokenResponse } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  

  constructor(private http: HttpClient) { }

  get_songs(){
    return this.http.get('/api/songs');
  }

  post_song(info: FormData){

    console.log(info);
    this.http.post('/api/songs', info).subscribe(data => {
      console.log(data);
    });
  }

  get_image(image){
    this.http.get(`/api/uploads/${image}`);
  }

  register_user(info: TokenPayload): Observable<any>{
    return this.http.post<TokenResponse>('/api/users/register', info, {observe: 'response'})
  }

  get_profile(token): Observable<any>{
    return this.http.get('/api/users/profile', {
      headers: {Authorization: `${token}`}
    })
  }

  login_user(info: TokenPayload): Observable<any>{
    return this.http.post<TokenResponse>('/api/users/login', info)
  }

  delete_songs(): Observable<any>{
    return this.http.delete('/api/songs');
  }

  delete_users(): Observable<any> {
    return this.http.delete('/api/users');
  }

  getUsername(id: string): Observable<any> {
    return this.http.post('/api/users/username', {id: id});
  }

  makeAdmin(user: string): Observable<any>{
    return this.http.post('/api/users/make-admin', {username: user})
  }
  
  removeAdmin(user: string): Observable<any>{ 
    return this.http.post('/api/users/remove-admin', {username: user})
  }

  searchSongs(search: string){
    console.log(search);
    return this.http.get(`/api/songs/search?search=${search}`)
  }

}

interface Song {
    name: string,
    artist: string,
    date: Date,
    posted_by?: string
}
