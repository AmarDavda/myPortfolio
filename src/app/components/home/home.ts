import { CommonModule } from '@angular/common';
import {
  Component, HostListener, OnDestroy, AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../shared/footer/footer';
import { PortfolioService } from '../../shared/portfolio.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnDestroy, AfterViewInit {

  // Experience (and footer) text come from public/data/portfolio.json
  readonly data = inject(PortfolioService).data;

  showBackToTop = false;

  // Tracks which section is currently in view, drives the nav underline/highlight
  activeSection = 'home';

  // Hamburger menu state (small mobile only)
  isMobileNavOpen = false;

  toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  closeMobileNav(): void {
    this.isMobileNavOpen = false;
  }

  @ViewChildren('scrollSection', { read: ElementRef })
  sections!: QueryList<ElementRef>;

  private sectionObserver: IntersectionObserver | null = null;
  private navObserver: IntersectionObserver | null = null;

  /* =========================================
     VIEW INITIALIZATION
  ========================================= */
  ngAfterViewInit(): void {
    this.observeSections();
    this.observeActiveNavSection();
  }

  /* =========================================
     SECTION OBSERVER
  ========================================= */
  private observeSections(): void {

    this.sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    this.sections.forEach((section) => {
      this.sectionObserver!.observe(section.nativeElement);
    });
  }
  /* =========================================
       NAV SCROLL-SPY OBSERVER
       Highlights the nav link matching whichever
       section currently occupies the middle of
       the viewport.
    ========================================= */
  private observeActiveNavSection(): void {
    this.navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      {
        // Treat the vertical center band of the viewport as "active",
        // offset for the sticky navbar height.
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0
      }
    );

    this.sections.forEach((section) => {
      this.navObserver!.observe(section.nativeElement);
    });
  }
  /* =========================================
     BACK TO TOP
  ========================================= */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showBackToTop = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy(): void {
    this.sectionObserver?.disconnect();
    this.navObserver?.disconnect();
  }
}
