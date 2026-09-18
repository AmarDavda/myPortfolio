import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { RouterLink } from '@angular/router';

interface EducationItem {
  logo: string;
  degree: string;
  institute: string;
  years: string;
  resultImage: string;
}

interface CertificationItem {
  image: string;
  title: string; // used for alt text only, per your spec (card shows photo only)
}

interface InfoCard {
  name: string;
  image: string;
}

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
})
export class About implements AfterViewInit, OnDestroy {

  /* =========================================
     NAV / SCROLL-SPY
  ========================================= */
  activeSection = 'me';
  isMobileNavOpen = false;
  showBackToTop = false;

  @ViewChildren('revealSection')
  sections!: QueryList<ElementRef>;

  private revealObserver: IntersectionObserver | null = null;
  private navObserver: IntersectionObserver | null = null;

  toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  closeMobileNav(): void {
    this.isMobileNavOpen = false;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showBackToTop = window.scrollY > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  scrollToSection(event: Event, id: string): void {
  event.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  this.closeMobileNav();
}

  ngAfterViewInit(): void {
    this.observeReveal();
    this.observeActiveNav();
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.navObserver?.disconnect();
    this.stopEducationAutoplay();
    this.stopCertificationAutoplay();
  }

  private observeReveal(): void {
    this.revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    this.sections.forEach((s) => this.revealObserver!.observe(s.nativeElement));
  }

  private observeActiveNav(): void {
    this.navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    this.sections.forEach((s) => this.navObserver!.observe(s.nativeElement));
  }

  /* =========================================
     ME SECTION CONTENT
  ========================================= */
  meImage = 'assets/profile/amar_2.jpg';

  whyWorkWithMe = [
    'I bring a mix of curiosity and discipline to every project — I care about clean code as much as I care about the end result actually working well for the people using it.',
    'I communicate clearly, stay organized under deadlines, and treat every task — big or small — as something worth doing properly.'
  ];

  /* =========================================
     EDUCATION SLIDER
  ========================================= */
  education: EducationItem[] = [
    {
      logo: 'assets/education/logo/mu.jpg',
      degree: 'B.TECH. Information Technology', // TODO: confirm exact degree title
      institute: 'MU',
      years: '2022 — 2026',
      resultImage: 'assets/education/result/btech.jpg'
    },
    {
      logo: 'assets/education/logo/sos.jpg',
      degree: 'Higher Secondary (12th)',
      institute: 'Your School Name',
      years: '2020 — 2022',
      resultImage: 'assets/education/result/hsc.jpg'
    },
    {
      logo: 'assets/education/logo/sthari.jpg',
      degree: 'Secondary (10th)',
      institute: 'Your School Name',
      years: '2007 — 2020',
      resultImage: 'assets/education/result/ssc.jpg'
    }
  ];

  activeEducation = 0;
  educationTrackTransform = 'translateX(0%)';
  private educationTimer: ReturnType<typeof setInterval> | null = null;

  nextEducation(): void {
    if (!this.education.length) return;
    this.activeEducation = (this.activeEducation + 1) % this.education.length;
    this.updateEducationSlider();
  }

  previousEducation(): void {
    if (!this.education.length) return;
    this.activeEducation = this.activeEducation === 0
      ? this.education.length - 1
      : this.activeEducation - 1;
    this.updateEducationSlider();
  }

  goToEducation(index: number): void {
    if (index < 0 || index >= this.education.length) return;
    this.activeEducation = index;
    this.updateEducationSlider();
  }

  private updateEducationSlider(): void {
    this.educationTrackTransform =
      `translateX(calc(-${this.activeEducation} * var(--edu-slide-width)))`;
  }

  startEducationAutoplay(): void {
    this.stopEducationAutoplay();
    this.educationTimer = setInterval(() => this.nextEducation(), 6000);
  }

  stopEducationAutoplay(): void {
    if (this.educationTimer) {
      clearInterval(this.educationTimer);
      this.educationTimer = null;
    }
  }

  /* =========================================
     RESULT MODAL (opened from education card)
  ========================================= */
  selectedResultImage: string | null = null;

  openResult(image: string): void {
    this.selectedResultImage = image;
  }

  closeResult(): void {
    this.selectedResultImage = null;
  }

  /* =========================================
     CERTIFICATION SLIDER
  ========================================= */
  certifications: CertificationItem[] = [
    { image: 'assets/certificates/cpp.jpg', title: 'CPA: Programming Essentials in C++ ' },
    { image: 'assets/certificates/java.jpg', title: 'Java Programming' },
    { image: 'assets/certificates/python.jpg', title: 'Python 101 for Data Science' },
    { image: 'assets/certificates/sql.jpg', title: 'Database Programming with SQL' }
  ];

  activeCertification = 0;
  certificationTrackTransform = 'translateX(0%)';
  private certificationTimer: ReturnType<typeof setInterval> | null = null;

  nextCertification(): void {
    if (!this.certifications.length) return;
    this.activeCertification = (this.activeCertification + 1) % this.certifications.length;
    this.updateCertificationSlider();
  }

  previousCertification(): void {
    if (!this.certifications.length) return;
    this.activeCertification = this.activeCertification === 0
      ? this.certifications.length - 1
      : this.activeCertification - 1;
    this.updateCertificationSlider();
  }

  goToCertification(index: number): void {
    if (index < 0 || index >= this.certifications.length) return;
    this.activeCertification = index;
    this.updateCertificationSlider();
  }

  private updateCertificationSlider(): void {
    this.certificationTrackTransform =
      `translateX(calc(-${this.activeCertification} * var(--cert-slide-width)))`;
  }

  startCertificationAutoplay(): void {
    this.stopCertificationAutoplay();
    this.certificationTimer = setInterval(() => this.nextCertification(), 6000);
  }

  stopCertificationAutoplay(): void {
    if (this.certificationTimer) {
      clearInterval(this.certificationTimer);
      this.certificationTimer = null;
    }
  }

  /* =========================================
     MY INFO SECTION
  ========================================= */
  additionalInfo = [
    { label: 'Date of Birth', value: '01 Jan 2000' },       // TODO
    { label: 'Native Of', value: 'Gujarat, India' },        // TODO
    { label: 'Citizenship', value: 'Indian' },              // TODO
    { label: 'Marital Status', value: 'Single' }            // TODO
  ];

  languages: InfoCard[] = [
    { name: 'English', image: 'assets/skills/language/english.jpg' },
    { name: 'Gujarati', image: 'assets/skills/language/gujarati.png' },
    { name: 'Hindi', image: 'assets/skills/language/hindi.png' }
  ];

  hobbies: InfoCard[] = [
    { name: 'Music', image: 'assets/skills/hobbies/music.jpg' },
    { name: 'Reading', image: 'assets/skills/hobbies/reading.jpg' },
    { name: 'Mathematics', image: 'assets/skills/hobbies/maths.png' },
    { name: 'Sketching', image: 'assets/skills/hobbies/sketching.jpg' },
    { name: 'Fiction Writing', image: 'assets/skills/hobbies/writing.jpg' },
    { name: 'Explore Mythologies', image: 'assets/skills/hobbies/myths.jpg' },
    { name: 'Gardening', image: 'assets/skills/hobbies/gardening.png' }
  ];
}
