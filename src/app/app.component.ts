import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
 loadedPosts:Post[]=[];
 isFetching:boolean=false;

 constructor(private http:HttpClient){}

 ngOnInit(){
  this.fetchPosts();
     
 }

 onCreatePost(postData:{title:string, content:string}){
  console.log(postData);
  this.http.post<{name:string}>('https://angular-recipe-c13c6-default-rtdb.firebaseio.com/posts.json',
   postData).subscribe(
    (responseData)=>{
      console.log("respns",responseData)
    }
  )
 }

 onFetchPosts(){
   this.fetchPosts()
 }
 onClearPosts(){

 }

 private fetchPosts(){
  this.isFetching=true;
   this.http.get('https://angular-recipe-c13c6-default-rtdb.firebaseio.com/posts.json')
   .pipe(map((responseData:{[key:string]:Post})=>{
    const postArray:Post[]=[];
    for(const  key in responseData){
        postArray.push({...responseData[key],id:key})
    }
    return postArray;
 })).subscribe(
    (posts)=>{
      this.isFetching =false;
     this.loadedPosts=posts;
    }
   )
 }
}
