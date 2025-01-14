import { AfterContentInit, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, CanDeactivate } from '@angular/router';
import { BehaviorSubject, first, forkJoin, Observable } from 'rxjs';
import { fade } from '../fade.animation';
import { Author, Authors, MoyabeBlogService, Post } from '../moyabe-blog.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  animations: [fade]
})
export class PostComponent {
  postData = new BehaviorSubject<Post>({} as Post)
  authorData = new BehaviorSubject<Author>({} as Author)
  postContent = ''
  fadePanel = 'in'
  constructor(route: ActivatedRoute, public mybs: MoyabeBlogService) {
    setTimeout(()=>{
      route.params.subscribe(params => {
        window.scroll({
          top: 0
        })
        forkJoin({
          posts: this.mybs.Posts.pipe(first()),
          authors: this.mybs.Authors.pipe(first())
        }).subscribe(blogData => {
          this.postData.next({ ...blogData.posts[params['postId']], postId: params['postId'] })
          this.authorData.next(blogData.authors[blogData.posts[params['postId']].author])
          document.body.style.background = `url('${blogData.posts[params['postId']].cover}')`
          this.mybs.getPost(blogData.posts[params['postId']].markdown).subscribe(post => {
            this.postContent = post ?? ''
            this.fadePanel = 'out'
          })
        })
      })
    }, 100)
  }
  deactivate(){
    this.fadePanel = 'in'
  }
}
