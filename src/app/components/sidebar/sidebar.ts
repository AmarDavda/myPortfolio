import { Component, EventEmitter, HostListener, OnInit, Output, computed, inject } from '@angular/core';
import { PortfolioService } from '../../shared/portfolio.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  path: string;
  label: string;
  icon: string;
  exact: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {

  isCollapsed = false;

  // Everything (name, role, photo, resume, status, links) comes from public/data/portfolio.json
  private readonly data = inject(PortfolioService).data;

  /** Sidebar menu: one entry per page / route */
  readonly navItems: NavItem[] = [
    { path: '/', label: 'Home', icon: 'assets/icons/home.webp', exact: true },
    { path: '/about', label: 'About', icon: 'assets/icons/about.webp', exact: false },
    { path: '/skill', label: 'Skill', icon: 'assets/icons/skill.png', exact: false },
    { path: '/project', label: 'Project', icon: 'assets/icons/project.png', exact: false },
    { path: '/contact', label: 'Contact', icon: 'assets/icons/contact.png', exact: false },
  ];

  /** Profile card: photo, name, role and resume */
  readonly profile = computed(() => {
    const d = this.data();
    return {
      photo: d?.hero.logo ?? '',
      name: d?.hero.name ?? '',
      role: d?.hero.role ?? '',
      resume: d?.about.resume ?? '',
    };
  });

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

  /** Hides a broken <img> (same helper as the pages) */
  hideImage(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
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