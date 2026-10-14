import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PortfolioService } from '../portfolio.service';

export interface NavLink {
  id: string;
  label: string;
}

@Component({
  selector: 'app-page-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './page-navbar.html',
  styleUrls: ['../theme.css', './page-navbar.css'],
})
export class PageNavbar {
  @Input() links: NavLink[] = [];
  @Input() active = '';

  open = false;

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router);

  /** "Available" text comes from portfolio.json (hero.availability) */
  private readonly service = inject(PortfolioService);
  readonly status = computed(() => this.service.data()?.hero.availability ?? 'Available');

  /** Before the scroll-spy reports anything, the first link is active. */
  isActive(id: string, index: number): boolean {
    return this.active ? this.active === id : index === 0;
  }

  /** Brand: on the Home route it just scrolls to the top, elsewhere it navigates home. */
  brand(event: Event): void {
    this.open = false;
    if (this.router.url.split(/[?#]/)[0] === '/') {
      event.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  go(event: Event, id: string): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.open = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.open && !this.host.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.open = false;
  }
}
