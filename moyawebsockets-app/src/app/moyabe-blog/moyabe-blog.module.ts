import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoyabeBlogComponent } from './moyabe-blog.component';
import { RouterModule } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { PostComponent } from './post/post.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MarkdownModule } from 'ngx-markdown';
import { MatIconModule } from '@angular/material/icon';
@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value: any) : string[] {
    if(!(typeof value === "object") || value === null) return value
    return Object.keys(value)
  }
}
@NgModule({
  declarations: [
    MoyabeBlogComponent,
    BlogComponent,
    PostComponent,
    KeysPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MarkdownModule.forRoot(),
    RouterModule.forChild([
      {path: '', component:MoyabeBlogComponent, children: [
        {path: '', pathMatch: 'full', redirectTo: 'blog'},
        {path: 'blog', component: BlogComponent},
        {path: 'post/:postId', component: PostComponent},
        {path: '', pathMatch: 'full', redirectTo: 'blog'}
      ]}
    ])
  ]
})
export class MoyabeBlogModule { }
