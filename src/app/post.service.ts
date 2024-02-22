import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class PostService {
    constructor(private http:HttpClient){}
   createAndStorePost(title:string,content:string){
    const postData:Post={title:title,content:content}
    return this.http.post<{name:string}>('https://angular-recipe-c13c6-default-rtdb.firebaseio.com/posts.json',
    postData)
}

   fetchPosts(){
    return this.http.get('https://angular-recipe-c13c6-default-rtdb.firebaseio.com/posts.json')
   .pipe(map((responseData:{[key:string]:Post})=>{
    const postArray:Post[]=[];
    for(const  key in responseData){
        postArray.push({...responseData[key],id:key})
    }
    return postArray;
 }))
   }

   deletePosts(){
    return this.http.delete ('https://angular-recipe-c13c6-default-rtdb.firebaseio.com/posts.json')
   }
}