import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogServiceService } from '../blog-service.service';
import { Subscription } from 'rxjs';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from '../models/pagination';

@Component({
  selector: 'app-blog-administration',
  templateUrl: './blog-administration.component.html',
  styleUrls: ['./blog-administration.component.css']
})
export class BlogAdministrationComponent implements OnInit, OnDestroy {

  faTrash = faTrash;
  faEdit = faEdit;
  private blogServiceSubscription: Subscription;

  loading = false;
  pagination: Pagination;
  items: any[] = null;

  constructor(private blogService: BlogServiceService) { }

  ngOnInit() {
    if (this.pagination) {
      this.loadBlogs(this.pagination.CurrentPage);
    } else {
      this.loadBlogs(1);
    }
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
        item.dateModified = new Date(item.dateModified).toDateString();
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
