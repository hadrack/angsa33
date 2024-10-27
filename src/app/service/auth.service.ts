import { inject, Injectable, NgZone } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router'; // Corrected import for Router

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private supabase!: SupabaseClient;
  private router = inject(Router);
  private ngZone = inject(NgZone);

  constructor() {
    this.supabase = createClient(
      environment.api,
      environment.supaBaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('event', event);
      console.log('session', session);

      // Storing the session to local storage
      localStorage.setItem('session', JSON.stringify(session?.user)); // Fixed JSON.stringify syntax
      if (session?.user) { 
        this.ngZone.run(() => {
          this.router.navigate(['/chat']); // Fixed navigation path syntax
        });
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('session');
    return user !== 'undefined' && user !== null; // Improved check for user existence
  }

  async signInWithGoogle() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }
}