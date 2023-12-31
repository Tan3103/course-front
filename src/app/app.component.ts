import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private authGuardService: AuthGuardService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authGuardService.canActivate();

    if (this.isLoggedIn) {
      // const user = this.storageService.getUser();
      // this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      // this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logOut();
  }

  mobileMenuOpen: boolean = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
