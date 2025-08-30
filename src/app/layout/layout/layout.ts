import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header';
import { SidebarComponent } from '../components/sidebar/sidebar';
import { LayoutService } from '../layout.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class LayoutComponent implements OnInit {
  private layoutService = inject(LayoutService);
  isSidebarOpen = false;

  ngOnInit(): void {
    this.layoutService.isSidebarOpen().subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }
}