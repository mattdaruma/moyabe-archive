import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Author, MoyabeBlogService, Post } from '../moyabe-blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  postId: string
  postData: Post | null = null
  authorData: Author | null = null
  postContent: string | null = null
  constructor(route: ActivatedRoute, public mybs: MoyabeBlogService) { 
    route.params.subscribe(params => {
      this.postId = params['postId']
      this.mybs.Blog.pipe(first()).subscribe(blog => {
        this.postData = blog.posts[this.postId]
        this.authorData = blog.authors[this.postData?.author]
      })
      this.mybs.getPost(this.postId).subscribe(post => {
        this.postContent = post
      })
    })
  }

}
