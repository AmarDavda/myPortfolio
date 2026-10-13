import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { 

  isSidebarCollapsed = false;

  private readonly router = inject(Router);

  constructor() {
    // A new page always opens at its top (not at the footer of the previous page).
    // behavior 'instant' skips the global smooth-scroll so there is no long scroll-up animation.
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }));
  }

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

}