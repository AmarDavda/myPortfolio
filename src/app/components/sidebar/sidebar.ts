import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  isCollapsed = false;

  @Output() sidebarToggle = new EventEmitter<boolean>();

  /* =========================================
     INITIAL STATE
     On mobile, start collapsed (hidden) so the
     sidebar doesn't cover the page on first load.
  ========================================= */
  ngOnInit(): void {
    this.isCollapsed = this.isMobileViewport();
  }

  private isMobileViewport(): boolean {
    return typeof window !== 'undefined' && window.innerWidth <= 768;
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggle.emit(this.isCollapsed);
  }

  closeMobileSidebar(): void {
    // Only auto-close on mobile after a nav click.
    // On desktop, clicking a nav link shouldn't collapse the sidebar.
    if (this.isMobileViewport()) {
      this.isCollapsed = true;
      this.sidebarToggle.emit(this.isCollapsed);
    }
  }
}