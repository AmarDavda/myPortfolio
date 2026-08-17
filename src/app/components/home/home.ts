import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {
  AfterViewInit,
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


  @ViewChildren('scrollSection')
  sections!: QueryList<ElementRef>;


  /* =========================================
     VIEW INITIALIZATION
  ========================================= */

  ngAfterViewInit(): void {

    this.observeSections();

  }


  /* =========================================
     SECTION OBSERVER
  ========================================= */

  private observeSections(): void {

    const observer = new IntersectionObserver(

      (entries) => {

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

      observer.observe(section.nativeElement);

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

      technologies: [
        'Angular',
        'TypeScript',
        'HTML',
        'CSS'
      ]
    },


    {
      type: 'PROJECT',
      title: 'AI Chatbot Application',
      company: 'Personal Project',
      duration: '2025',

      location: 'India',

      description:
        'A conversational application built with a modern frontend and Python-based API architecture for interacting with AI services.',

      technologies: [
        'Python',
        'FastAPI',
        'JavaScript',
        'Bootstrap'
      ]
    },


    {
      type: 'PROJECT',
      title: 'Result History System',
      company: 'Academic Project',
      duration: '2024',

      location: 'India',

      description:
        'A web-based result management application designed to retrieve and display student examination results in a simple interface.',

      technologies: [
        'HTML',
        'JavaScript',
        'Bootstrap',
        'Excel'
      ]
    },


    {
      type: 'PROJECT',
      title: 'E-Commerce Android App',
      company: 'Academic Project',
      duration: '2025',

      location: 'India',

      description:
        'An Android shopping application featuring product browsing, cart functionality and purchase history.',

      technologies: [
        'Kotlin',
        'XML',
        'SQLite',
        'Android'
      ]
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

  }


  /* =========================================
     NEXT
  ========================================= */

  nextExperience(): void {

    if (!this.experiences.length) {
      return;
    }

    this.activeExperience =
      (this.activeExperience + 1) % this.experiences.length;

    this.updateExperienceSlider();

  }


  /* =========================================
     PREVIOUS
  ========================================= */

  previousExperience(): void {

    if (!this.experiences.length) {
      return;
    }

    this.activeExperience =
      this.activeExperience === 0
        ? this.experiences.length - 1
        : this.activeExperience - 1;

    this.updateExperienceSlider();

  }


  /* =========================================
     GO TO
  ========================================= */

  goToExperience(index: number): void {

    if (
      index < 0 ||
      index >= this.experiences.length
    ) {
      return;
    }

    this.activeExperience = index;

    this.updateExperienceSlider();

  }


  /* =========================================
     SLIDER POSITION
  ========================================= */

  private updateExperienceSlider(): void {

    /*
     * Each card occupies one third of the
     * track on desktop.
     *
     * CSS handles responsive card widths.
     *
     * We use a CSS variable for the movement.
     */

    this.experienceTrackTransform =
      `translateX(calc(-${this.activeExperience} * var(--experience-slide-width)))`;


    this.experienceProgress =
      ((this.activeExperience + 1) /
        this.experiences.length) * 100;

  }


  /* =========================================
     NUMBER FORMAT
  ========================================= */

  getExperienceNumber(index: number): string {

    return String(index + 1).padStart(2, '0');

  }


  /* =========================================
     AUTO PLAY
  ========================================= */

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
