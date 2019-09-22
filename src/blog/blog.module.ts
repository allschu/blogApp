import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { DetailBlogComponent } from './detail-blog/detail-blog.component';
import { RouterModule } from '@angular/router';
import { GridModule } from '@progress/kendo-angular-grid';
import { BlogServiceService } from './blog-service.service';
import { EditorModule } from '@progress/kendo-angular-editor';
import {AuthGuard} from '../shared/guards/auth.guard';

@NgModule({
  declarations: [
    AddBlogComponent,
    BlogListComponent,
    EditBlogComponent,
    DetailBlogComponent
  ],
  imports: [
    [
      RouterModule.forChild([
        {
          path: 'blog',
          children: [
            { path: 'list', component: BlogListComponent, pathMatch: 'full' },
            { path: 'add', component: AddBlogComponent, pathMatch: 'full' }, // canActivate: [AuthGuard],
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
          ]
        }
      ]),
      CommonModule,
      GridModule,
      EditorModule,
      ReactiveFormsModule
    ]
  ],
  providers: [BlogServiceService]
})
export class BlogModule {}
