import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoyabeBlogService {
  public Blog = new ReplaySubject<Blog>(1)
  constructor(private http: HttpClient) { 
    this.http.get<Blog>('/assets/moyabe-blog/blog.json').subscribe(blog => {
      this.Blog.next(blog)
    })
  }
  getPost(postId: string){
    return this.http.get(`/assets/moyabe-blog/posts/${postId}/post.md`, {responseType: 'text' })
  }
}

export interface Blog {
  name: string;
  title: string;
  description: string;
  authors: Authors;
  posts: Posts;
}
export interface Authors {
  [propName: string]: Author
}
export interface Author {
  authorId: string;
  displayName: string;
  catchPhrase: string;
  avatar: string;
  addedDate: number;
}
export interface Posts {
  [propName: string]: Post
}
export interface Post {
  postId: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  addedDate: number;
  cover: string;
  images: PostImage[];
}
export interface PostImage {
  fileName: string;
  title: string;
  description: string;
  addedDate: number;
}