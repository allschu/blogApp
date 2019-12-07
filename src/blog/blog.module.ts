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
import { NotifyService } from 'src/shared/notifications/toastrService';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BlogAdministrationComponent } from './blog-administration/blog-administration.component';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { NgxLoadingModule } from 'ngx-loading';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AddBlogComponent,
    BlogListComponent,
    EditBlogComponent,
    DetailBlogComponent,
    BlogAdministrationComponent,
  ],
  imports: [
    [
      RouterModule.forChild([
        {
          path: 'blog',
          children: [
            { path: 'list', component: BlogListComponent, pathMatch: 'full' },
            { path: 'add', component: AddBlogComponent, pathMatch: 'full' },
            { path: 'detail', component: DetailBlogComponent, pathMatch: 'full' },
            { path: 'admin', component: BlogAdministrationComponent, pathMatch: 'full'}, //canActivate: [AuthGuard]},
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
          ]
        }
      ]),
      CommonModule,
      GridModule,
      FontAwesomeModule,
      PaginationModule.forRoot(),
      NgxLoadingModule.forRoot({}),
      EditorModule,
      ReactiveFormsModule
    ]
  ],
  providers: [AuthGuard, BlogServiceService, NotifyService]
})
export class BlogModule {}
