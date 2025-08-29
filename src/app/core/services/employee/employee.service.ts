/*
 * src/app/core/services/employee.service.ts
 * Serviço para buscar dados do funcionário.
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { EmployeeResponse } from '../../models/employee/employee-response.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Use a URL base da API e o prefixo do endpoint de funcionário
  private apiUrl = '/api/employee';

  constructor(private http: HttpClient) {}

  getOwnProfile(): Observable<EmployeeResponse> {
    return this.http.get<EmployeeResponse>(`${this.apiUrl}/own-profile`);
  }
}