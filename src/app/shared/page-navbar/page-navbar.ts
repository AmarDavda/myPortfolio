import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

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

  /** Before the scroll-spy reports anything, the first link is active. */
  isActive(id: string, index: number): boolean {
    return this.active ? this.active === id : index === 0;
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
