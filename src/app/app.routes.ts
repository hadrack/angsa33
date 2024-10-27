import { Routes } from '@angular/router';
import { createClient } from '@supabase/supabase-js';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'chat',
    canActivate: [authGuard], // Changed 'CanActivate' to 'canActivate' (lowercase 'c')
    loadComponent: () => import('./pages/chat/chat.component').then((com) => com.ChatComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((com) => com.LoginComponent)
  },
  {
    path: '',
    loadComponent: () => import('./pages/login/login.component').then((com )=> com.LoginComponent)
  },
];