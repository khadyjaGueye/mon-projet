import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../core/services/token.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  //http://spamonsite.22web.org/

  isMenuOpen = false;
  isLoggedIn: boolean = false;

  constructor(private tokenService: TokenService, private router: Router) { }
  
  ngOnInit(): void {
    this.checkLogin();
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  checkLogin(): void {
    this.isLoggedIn = this.tokenService.isLoggedIn();
  }

  logout(): void {
    this.tokenService.removeToken();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
