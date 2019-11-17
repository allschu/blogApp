import { NgModule } from '@angular/core';
import { AdminBlogListComponent } from './admin-blog-list/admin-blog-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        {
          path: 'admin',
          children: [
            { path: 'list', component: AdminBlogListComponent, pathMatch: 'full' },
            { path: '**', redirectTo: 'list', pathMatch: 'full' }
          ]
        }
      ])],
    exports: [],
    declarations: [AdminBlogListComponent],
    providers: [],
})
export class AdminModule { }
