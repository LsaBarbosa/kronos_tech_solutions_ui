import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../layout.service';
 import { Router } from '@angular/router';
 import { ProfileComponent } from '../../../features/profile/profile';
import { AuthService } from '../../../core/services/auth/auth';
import { ProfilePopupComponent } from "../profile/profile-popup";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ProfileComponent, ProfilePopupComponent], // Adicione o pop-up aos imports
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  private layoutService = inject(LayoutService);
  private authService = inject(AuthService);
  private router = inject(Router);

  profileImageUrl: string = 'https://i.pravatar.cc/150?u=a042581f4e29026704d';
  isProfilePopupVisible = false; // Novo estado para controlar a visibilidade do pop-up

  toggleSidebar(): void {
    this.layoutService.toggleSidebar();
  }

  // Novo método para abrir o pop-up
  openProfilePopup(): void {
    this.isProfilePopupVisible = true;
  }

  // Novo método para fechar o pop-up
  closeProfilePopup(): void {
    this.isProfilePopupVisible = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}