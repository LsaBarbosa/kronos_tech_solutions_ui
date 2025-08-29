import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../layout.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  private layoutService = inject(LayoutService);
  isSidebarOpen = false;

  constructor() {
    this.layoutService.isSidebarOpen().subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }

  // Função para fechar a barra lateral ao clicar em um item
  closeSidebar(): void {
    this.layoutService.toggleSidebar();
  }
}