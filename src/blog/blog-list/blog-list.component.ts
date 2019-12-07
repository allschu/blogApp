import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { BlogServiceService } from '../blog-service.service';
import { BlogClass } from '../models/blog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pagination } from '../models/pagination';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {

  // Subscriptions
  private blogServiceSubscription: Subscription;

  loading = false;

  items: any[] = null;
  pagination: Pagination;

  constructor(private blogService: BlogServiceService) { }

  ngOnInit() {
    if (this.pagination) {
      this.loadBlogs(this.pagination.CurrentPage);
    } else {
      this.loadBlogs(1);
    }
  }

  ngOnDestroy() {
    this.blogServiceSubscription.unsubscribe();
  }


  pageChanged(event: any): void {
    // watch out this pageChanged event can cause a loop, always check if you need to change
    if (this.pagination.CurrentPage !== event.page) {
      this.pagination.CurrentPage = event.page;
      this.loadBlogs(this.pagination.CurrentPage);
    }
  }

  loadBlogs(pageNumber: number) {
    this.loading = true;
    this.blogServiceSubscription = this.blogService.getBlogs(pageNumber, 10).subscribe(values => {
      values.result.map(item => {
        item.dateCreated = new Date(item.dateCreated).toDateString();
      });
      this.items = values.result;
      this.pagination = values.pagination;
      this.loading = false;
    });
  }

}
