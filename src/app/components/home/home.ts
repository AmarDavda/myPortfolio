import { CommonModule } from '@angular/common';
import {
  Component, HostListener, OnDestroy, OnInit, AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy, AfterViewInit {

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

  @ViewChildren('scrollSection')
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

  experiences = [
    {
      type: 'PROJECT',
      title: 'E-Commerce Platform',
      company: 'Personal Project',
      duration: '2025 — Present',
      location: 'India',
      description:
        'A responsive e-commerce platform focused on clean UI, product management and a smooth shopping experience.',
      technologies: ['Angular', 'TypeScript', 'HTML', 'CSS']
    },
    {
      type: 'PROJECT',
      title: 'AI Chatbot Application',
      company: 'Personal Project',
      duration: '2025',
      location: 'India',
      description:
        'A conversational application built with a modern frontend and Python-based API architecture for interacting with AI services.',
      technologies: ['Python', 'FastAPI', 'JavaScript', 'Bootstrap']
    },
    {
      type: 'PROJECT',
      title: 'Result History System',
      company: 'Academic Project',
      duration: '2024',
      location: 'India',
      description:
        'A web-based result management application designed to retrieve and display student examination results in a simple interface.',
      technologies: ['HTML', 'JavaScript', 'Bootstrap', 'Excel']
    },
    {
      type: 'PROJECT',
      title: 'E-Commerce Android App',
      company: 'Academic Project',
      duration: '2025',
      location: 'India',
      description:
        'An Android shopping application featuring product browsing, cart functionality and purchase history.',
      technologies: ['Kotlin', 'XML', 'SQLite', 'Android']
    }
  ];

  activeExperience = 0;
  experienceTrackTransform = 'translateX(0%)';
  experienceProgress = 25;

  private experienceTimer: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.updateExperienceSlider();
    this.startExperienceSlider();
  }

  ngOnDestroy(): void {
    this.stopExperienceSlider();
    this.sectionObserver?.disconnect();
    this.navObserver?.disconnect();
  }

  nextExperience(): void {
    if (!this.experiences.length) return;
    this.activeExperience = (this.activeExperience + 1) % this.experiences.length;
    this.updateExperienceSlider();
  }

  previousExperience(): void {
    if (!this.experiences.length) return;
    this.activeExperience =
      this.activeExperience === 0
        ? this.experiences.length - 1
        : this.activeExperience - 1;
    this.updateExperienceSlider();
  }

  goToExperience(index: number): void {
    if (index < 0 || index >= this.experiences.length) return;
    this.activeExperience = index;
    this.updateExperienceSlider();
  }

  private updateExperienceSlider(): void {
    this.experienceTrackTransform =
      `translateX(calc(-${this.activeExperience} * var(--experience-slide-width)))`;
    this.experienceProgress =
      ((this.activeExperience + 1) / this.experiences.length) * 100;
  }

  getExperienceNumber(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  startExperienceSlider(): void {
    this.stopExperienceSlider();
    this.experienceTimer = setInterval(() => {
      this.nextExperience();
    }, 5000);
  }

  pauseExperienceSlider(): void {
    this.stopExperienceSlider();
  }

  private stopExperienceSlider(): void {
    if (this.experienceTimer) {
      clearInterval(this.experienceTimer);
      this.experienceTimer = null;
    }
  }
}