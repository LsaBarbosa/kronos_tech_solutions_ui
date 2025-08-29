import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../layout.service';
import { Router } from '@angular/router';
import { ProfilePopupComponent } from '../profile/profile-popup';
import { AuthService } from '../../../core/services/auth/auth';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ProfilePopupComponent],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  private layoutService = inject(LayoutService);
  private authService = inject(AuthService);
  private router = inject(Router);

  profileImageUrl: string = 'https://i.pravatar.cc/150?u=a042581f4e29026704d';
  isProfileMenuOpen = false; // Estado para o menu de perfil

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
    if (this.isProfileMenuOpen) {
      this.isProfileMenuOpen = false;
    }
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}