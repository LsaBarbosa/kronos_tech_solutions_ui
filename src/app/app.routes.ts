import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
 
export const routes: Routes = [
  // Redireciona a rota inicial ('') para a página de login
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Rota para o componente de login
  { path: 'login', component: LoginComponent },
  
  // Rota para qualquer URL inválida, redirecionando de volta para o login
  { path: '**', redirectTo: 'login' }
];