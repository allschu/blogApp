import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { DetailBlogComponent } from './detail-blog/detail-blog.component';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [AddBlogComponent, BlogListComponent, EditBlogComponent, DetailBlogComponent],
  imports: [
    [RouterModule.forChild([{
      path: 'blog',
      children: [

        { path: '', component: BlogListComponent, pathMatch: 'full' },
        { path: 'add', component: AddBlogComponent, pathMatch: 'full' }
        //{ path: 'add', canActivate: [AuthBlogGuard], component: BlogAddComponent, pathMatch: 'full' },
      ]
    }]),
    CommonModule,
    GridModule,
    CKEditorModule,
    ReactiveFormsModule

  ]]
})
export class BlogModule { }
