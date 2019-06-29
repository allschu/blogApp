import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { MenuItem } from './model/menuItem';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isExpanded = false;
  menuItems: MenuItem[] = [
    { name: 'Home', title: '', selected: false, childItems: [] },
    {
      name: 'Blog', title: 'Blog overview', selected: false, childItems: [
        { name: 'AddBlog', title: 'Toevoegen blog', childItems: [], selected: false },
        { name: 'DeleteBlog', title: 'Verwijderen blog', childItems: [], selected: false }
      ]
    }
  ];

  constructor(private authService: AuthServiceService) { }

  ngOnInit() {

  }

  public setMenuItemActive(item: MenuItem) {

    // make sure that all items are deselected before setting a new menu active
    this.setAllMenuItemsInActive();

    const foundMenuItem = this.menuItems.find(m => m.name === item.name);

    foundMenuItem.selected = true;
  }

  public login() {
    this.authService.login();
  }

  public logout() {
    this.authService.logout();
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  public collapse() {
    this.isExpanded = false;
  }

  public toggle() {
    this.isExpanded = !this.isExpanded;
  }

  //#region private helpers

  private setAllMenuItemsInActive() {
    this.menuItems.forEach(m => m.selected = false);
  }

  //#endregion
}
