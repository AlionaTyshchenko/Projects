import { Observable, map} from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Post } from "src/app/shared/components/main-layout/interfaces";
import { environment } from "src/environments/environment";
import { FbCreateResponse } from "src/app/shared/components/main-layout/interfaces";

@Injectable( {providedIn:'root'}) 

export class PostsService {

  constructor( private http: HttpClient) {}

  create(post: Post) :Observable<Post> {
    return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map( (response:FbCreateResponse) => {
        return {
          ...post,
          id: response.name,
          date: new Date(post.date)
        } 
      }))
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe( map( (response: {[key:string]: any}) => {
        return Object.keys(response)
          .map( key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }

  getById(id:any){
    return this.http.get(`${environment.fbDbUrl}/posts/${id}.json`)
    .pipe(map( (post:any) => {
      return {
        ...post,id,
        date: new Date(post.date)
      } 
    }))
  }

  remove(id:string):Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

  update(post:Post):Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }
}