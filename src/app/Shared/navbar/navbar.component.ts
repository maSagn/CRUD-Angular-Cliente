import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private router: Router,
    public authService: AuthService
  ) { }

  logout() {

    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  dashboard() {
    if (this.authService.isAdmin()) {
      this.router.navigate(['/usuarios']);
    } else {
      this.router.navigate(['/myAccount']);
    }
  }
}
