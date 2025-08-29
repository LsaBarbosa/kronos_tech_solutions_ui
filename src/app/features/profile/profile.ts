/*
 * src/app/features/profile/profile.component.ts
 * Componente para exibir o perfil do usuário.
 */
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { EmployeeResponse } from '../../core/models/employee/employee-response.model';
import { EmployeeService } from '../../core/services/employee/employee.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  private employeeService = inject(EmployeeService);
  employeeProfile: EmployeeResponse | null = null;
  isLoading = true;
  error: string | null = null;
  showSalary = false;

  ngOnInit(): void {
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
}