import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { BlogServiceService } from '../blog-service.service';
import { BlogClass } from '../models/blog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  // Subscriptions
  private blogServiceSubscription: Subscription;

  public columns: any[] = [
    { field: 'id' },
    { field: 'title' },
    { field: 'dateCreated',  format: ''}
  ];

  // Fields
  private items: any[] = null;
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  public allowUnsort = true;
  public sort: SortDescriptor[] = [
    {
      field: 'title',
      dir: 'asc'
    }
  ];

  constructor(private blogService: BlogServiceService) {}

  ngOnInit() {
    this.blogServiceSubscription = this.blogService
      .getBlogs()
      .subscribe(values => {
        values.map(item => {
          item.dateCreated = new Date(item.dateCreated).toDateString();
        });
        this.items = values;
        this.loadItems();
      });
  }

  ngOnDestroy() {
    this.blogServiceSubscription.unsubscribe();
  }

  private loadItems(): void {
    this.gridView = {
      data: orderBy(
        this.items.slice(this.skip, this.skip + this.pageSize),
        this.sort
      ),
      total: this.items.length
    };
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadItems();
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }
}
