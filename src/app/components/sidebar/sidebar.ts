import { Component, EventEmitter, HostListener, OnInit, Output, computed, inject } from '@angular/core';
import { PortfolioService } from '../../shared/portfolio.service';
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

  // Social / contact links come from public/data/portfolio.json
  private readonly data = inject(PortfolioService).data;

  /** Dev-status card: availability + "currently working on" */
  readonly status = computed(() => {
    const hero = this.data()?.hero;
    return {
      availability: hero?.availability ?? 'Available',
      project: hero?.currentlyWorking.project ?? '',
      tech: hero?.currentlyWorking.tech ?? [],
    };
  });

  readonly links = computed(() => {
    const contact = this.data()?.contact;
    const item = (title: string) => contact?.item.find((i) => i.title === title)?.link ?? '';
    const social = (name: string) => contact?.socials?.find((s) => s.name === name)?.link ?? '';
    return {
      linkedin: social('LinkedIn'),
      github: social('GitHub'),
      email: item('Email'),
      whatsapp: item('Whatsapp'),
      location: item('Address'),
    };
  });

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