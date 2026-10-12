import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Portfolio } from './portfolio.model';

/* Loads public/data/portfolio.json once and shares it with every page.
   Edit that JSON file to change any text, image path, project or skill. */
@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private readonly http = inject(HttpClient);

  readonly data = signal<Portfolio | null>(null);
  readonly failed = signal(false);

  constructor() {
    this.http.get<Portfolio>('data/portfolio.json').subscribe({
      next: (value) => this.data.set(value),
      error: () => this.failed.set(true),
    });
  }
}
