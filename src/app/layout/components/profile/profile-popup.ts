import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common'; 
import { EmployeeResponse } from '../../../core/models/employee/employee-response.model';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth';

@Component({
  selector: 'app-profile-popup',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './profile-popup.html',
  styleUrls: ['./profile-popup.css']
})
export class ProfilePopupComponent implements OnInit {
   private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  @Input() open = false;
  @Output() close = new EventEmitter<void>();

  employeeProfile: EmployeeResponse | null = null;
  isLoading = true;
  error: string | null = null;
  showSalary = false;

  ngOnInit(): void {
    // Carrega os dados do perfil assim que o componente é inicializado
    this.employeeService.getOwnProfile().subscribe({
      next: (profile) => {
        this.employeeProfile = profile;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Não foi possível carregar os dados do perfil.';
        this.isLoading = false;
        console.error('Erro ao buscar perfil:', err);
      }
    });
  }

  toggleSalary(): void {
    this.showSalary = !this.showSalary;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.close.emit(); // Fecha o menu após o logout
  }

  closeMenu(): void {
    this.close.emit();
  }
}