import { Component, OnInit } from '@angular/core';
import { MoyabeBlogService } from './moyabe-blog.service';

@Component({
  selector: 'app-moyabe-blog',
  templateUrl: './moyabe-blog.component.html',
  styleUrls: ['./moyabe-blog.component.scss']
})
export class MoyabeBlogComponent {

  constructor(public mybs: MoyabeBlogService) { 
  }

}
