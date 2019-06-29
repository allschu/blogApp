import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
    console.log('call completion');
    this.authService.completeAuthentication();
  }

}
