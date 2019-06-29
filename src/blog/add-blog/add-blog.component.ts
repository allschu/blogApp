import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'src/shared/nav-menu/model/menuItem';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogClass } from '../models/blog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  public Editor = ClassicEditor;
  @Output() menuItem = new EventEmitter<MenuItem>();

  insertedBlog: BlogClass;

  addBlogForm = new FormGroup({
    txtTitle: new FormControl('', [Validators.required, Validators.minLength(2)]),
    txtIntro: new FormControl('', [Validators.required, Validators.minLength(5)]),
    txtContent: new FormControl('', [Validators.required]),
    txtAuthor: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit() {
  }

  saveForm() {
    console.log(this.addBlogForm);
  }

}
