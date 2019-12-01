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

  private items: any[] = null;
  pagination: Pagination;
  loading = false;

  constructor(private blogService: BlogServiceService) {}

  ngOnInit() {
    this.loading = true;
    this.blogServiceSubscription = this.blogService
      .getBlogs(1, 10)
      .subscribe(values => {
        values.result.map(item => {
          item.dateCreated = new Date(item.dateCreated).toDateString();
        });
        this.items = values.result;
        this.pagination = values.pagination;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.blogServiceSubscription.unsubscribe();
  }



}
