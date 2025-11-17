import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { FormsModule } from '@angular/forms';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrls: ['./login-component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router, private session: SessionService) {}

  login() {
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.router.navigate(['/dashboard']);
      },
      error: () => alert('Invalid login'),
    });
  }
}
