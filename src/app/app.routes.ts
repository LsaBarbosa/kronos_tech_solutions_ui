/*
 * src/app/app.routes.ts
 *
 * Roteamento principal da aplicação.
 */
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { LoginComponent } from './features/auth/login/login';
import { Home } from './features/home/home/home';
import { LayoutComponent } from './layout/layout/layout';
 

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    {
      path: '',
      component: LayoutComponent,
      canActivate: [authGuard],
      children: [
        { path: 'home', component: Home  },
        // A rota de perfil foi removida daqui
        { path: '', redirectTo: 'home', pathMatch: 'full' }
      ]
    },

    { path: '**', redirectTo: 'login' }
];