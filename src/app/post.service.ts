import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, tap } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class PostService {
    constructor(private http:HttpClient){}
   createAndStorePost(title:string,content:string){
    const postData:Post={title:title,content:content}
    return this.http.post<{name:string}>('https://angular-recipe-c13c6-default-rtdb.firebaseio.com/posts.json',
    postData,
    {
        observe:'response'
    }
    )
}

   fetchPosts(){
    let searchParams = new HttpParams()
    searchParams= searchParams.append('print','pretty');
    searchParams=searchParams.append('custom','key');
    return this.http.get('https://angular-recipe-c13c6-default-rtdb.firebaseio.com/posts.json',
    {
        headers:new HttpHeaders({'Custom-Header':'Hello'}),
        // params:new HttpParams().set('print','pretty')
        params:searchParams
    }
    )
   .pipe(map((responseData:{[key:string]:Post})=>{
    const postArray:Post[]=[];
    for(const  key in responseData){
        postArray.push({...responseData[key],id:key})
    }
    return postArray;
 }))
   }

   deletePosts(){
    return this.http.delete ('https://angular-recipe-c13c6-default-rtdb.firebaseio.com/posts.json',
    {
        observe:'events',
        responseType:'json'
    }
    ).pipe(tap(event=>{
        console.log("event",event)
        if(event.type===HttpEventType.Sent){

        }
        if(event.type===HttpEventType.Response){
            console.log('eventBody',event.body)
        }
    }))
   }
}