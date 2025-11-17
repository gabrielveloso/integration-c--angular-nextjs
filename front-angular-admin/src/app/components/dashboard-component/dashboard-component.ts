import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Observable, of } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.scss'],
})
export class DashboardComponent implements OnInit {
  adminUsers: Observable<any[]> = of([]);
  adminName: string = '';
  USER_URL = environment.USER_URL;

  constructor(private session: SessionService) {}

  ngOnInit() {
    this.loadAdmin();
    this.loadAdminUsers();
  }

  loadAdmin() {
    this.session.getAdmin().subscribe({
      next: (admin) => {
        console.log(admin);

        this.adminName = admin.userId;
      },
      error: () => alert('error loading user logged in'),
    });
  }

  loadAdminUsers() {
    this.adminUsers = this.session.getAdminUsers();
  }
}
