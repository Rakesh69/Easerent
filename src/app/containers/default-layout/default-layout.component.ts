import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { CommonService } from '../../common/commonService';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})



export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  loginUser = this._commonService.getLoggedInUser();
  userShortName = null;
  public username = null;
  constructor(public router: Router, public _commonService: CommonService, @Inject(DOCUMENT) _document?: any, ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    if (!this.loginUser) {
      this.router.navigate(['/login']);
    }

    this.username = this.loginUser.firstName + (this.loginUser.lastName ? ' ' + this.loginUser.lastName : ' ');

    const matches = this.username.match(/\b(\w)/g);
    this.userShortName = matches.join('');

  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }



  logout() {
    this.router.navigate(['/']);
  }
}
