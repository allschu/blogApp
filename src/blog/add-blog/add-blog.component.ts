import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MenuItem } from 'src/shared/nav-menu/model/menuItem';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogClass } from '../models/blog';
import { BlogServiceService } from '../blog-service.service';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit, OnDestroy {

  // public Editor = ClassicEditor;
  @Output() menuItem = new EventEmitter<MenuItem>();


  insertedBlog: BlogClass;

  addBlogForm = new FormGroup({
    txtTitle: new FormControl('', [Validators.required, Validators.minLength(2)]),
    txtIntro: new FormControl('', [Validators.required, Validators.minLength(5)]),
    txtContent: new FormControl('', [Validators.required]),
    txtAuthor: new FormControl('', [Validators.required])
  });

  constructor(private blogService: BlogServiceService) { }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  saveForm() {
    if (this.addBlogForm.valid && this.addBlogForm.dirty) {

      let blogToAdd: any;

      blogToAdd = {
        Author: this.addBlogForm.value.txtAuthor,
        Text: this.addBlogForm.value.txtContent,
        Introduction: this.addBlogForm.value.txtIntro,
        Title: this.addBlogForm.value.txtTitle
      };

      this.blogService.addBlog(blogToAdd).subscribe(() => console.log('blog saved'), (error: any) => console.log('ERROR: ' + error));
    }

  }

}
