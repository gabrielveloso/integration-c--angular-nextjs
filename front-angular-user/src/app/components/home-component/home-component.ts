import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Observable, of, shareReplay } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements OnInit {
  user$: Observable<any> = of(null);
  user: any = null;

  constructor(private session: SessionService) {}

  ngOnInit() {
    this.user$ = this.session.getMe().pipe(shareReplay(1));

    this.user$.subscribe((u) => {
      this.user = u;
      if (u == null) {
        this.goBack();
      }
    });
  }

  goBack() {
    if (typeof window !== 'undefined') window.location.href = environment.APP_URL;
  }
}
