import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAdministrationComponent } from './blog-administration.component';

describe('BlogAdministrationComponent', () => {
  let component: BlogAdministrationComponent;
  let fixture: ComponentFixture<BlogAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
