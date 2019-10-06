import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { MenuItem } from 'src/shared/nav-menu/model/menuItem';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogClass } from '../models/blog';
import { BlogServiceService } from '../blog-service.service';
import { NotifyService } from 'src/shared/notifications/toastrService';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit, OnDestroy {
  // public Editor = ClassicEditor;
  @Output() menuItem = new EventEmitter<MenuItem>();

  public events: string[] = [];
  insertedBlog: BlogClass;

  addBlogForm: FormGroup;

  constructor(private blogService: BlogServiceService, private notifyService: NotifyService) {}

  ngOnInit() {
    this.addBlogForm = new FormGroup({
      inputTitle: new FormControl(''),
      inputAuthor: new FormControl(''),
      inputIntro: new FormControl(''),
      inputText: new FormControl('')
    });

    this.notifyService.success('hhuuuurrraayyy');
  }

  ngOnDestroy() {}

  saveForm() {
    if (this.addBlogForm.valid && this.addBlogForm.dirty) {
      let blogToAdd: any;

      blogToAdd = {
        Author: this.addBlogForm.value.inputText,
        Text: this.addBlogForm.value.txtContent,
        Introduction: this.addBlogForm.value.inputIntro,
        Title: this.addBlogForm.value.inputTitle
      };

      this.blogService
        .addBlog(blogToAdd)
        .subscribe(
          () => console.log('blog saved'),
          (error: any) => console.log('ERROR: ' + error)
        );
    }
  }

  public valueChange(value: any): void {}
}
