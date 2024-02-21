import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
 loadedPosts=[];

 constructor(private http:HttpClient){}

 ngOnInit(){
  this.fetchPosts();
     
 }

 onCreatePost(postData:{title:string, content:string}){
  console.log(postData);
  this.http.post('https://angular-recipe-c13c6-default-rtdb.firebaseio.com/posts.json',
   postData).subscribe(
    (responseData)=>{
      console.log("respns",responseData)
    }
  )
 }

 onFetchPosts(){
   this.fetchPosts();
 }
 onClearPosts(){

 }

 private fetchPosts(){
   this.http.get('https://angular-recipe-c13c6-default-rtdb.firebaseio.com/posts.json').
   subscribe(
    (posts)=>{
      console.log("psoot",posts)
    }
   )
 }
}
