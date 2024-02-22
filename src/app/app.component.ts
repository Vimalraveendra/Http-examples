import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
 loadedPosts:Post[]=[];
 isFetching:boolean=false;
 error:string=null;

 constructor(
  private http:HttpClient,
  private postService:PostService
  ){}

 ngOnInit(){
  this.fetchPostsSubscribe();
     
 }

 onCreatePost(postData:{title:string, content:string}){
  console.log(postData);
   this.postService.createAndStorePost(postData.title,postData.content).subscribe({
    next:(responseData)=>{
      console.log('response',responseData)
      if(responseData.body.name){
         this.loadedPosts.push(postData);
      }
    },
    error:(error:any)=>{
     this.error=error.message;
   }
   }
    
  )
 }

 onFetchPosts(){
   this.fetchPostsSubscribe()
 }
 onClearPosts(){
     this.postService.deletePosts().subscribe({
     next: ()=>{
        this.loadedPosts=[];
      },
      error:(error:any)=>{
        this.error=error.message;
      }
  } )
 }

 private fetchPostsSubscribe(){
  this.isFetching=true;
  this.postService.fetchPosts()
   .subscribe({
    next:posts=>{
      this.isFetching =false;
      this.loadedPosts=posts;
    },
    error:(error:any)=>{
      console.log('eror',error)
      this.isFetching =false;
      this.error=error.message;
    }
   }
   
   )
 }

 onHandleError(){ 
  this.error=null;
 }
}
