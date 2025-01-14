import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MoyabeBlogService } from '../moyabe-blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  constructor(public mybs: MoyabeBlogService) { }


}
