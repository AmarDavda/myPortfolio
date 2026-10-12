import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NavLink } from './page-navbar/page-navbar';
import { PerView, SliderState } from './slider-state';

/* =========================================
   BASE CLASS FOR ABOUT / SKILL / PROJECT / CONTACT

   Gives each page:
   - scroll reveal   (adds .visible to every #revealSection)
   - scroll-spy      (activeSection follows the section in view)
   - slider helpers  (createSlider + resize handling)
   - image fallback  (hideImage)
========================================= */
@Directive()
export abstract class PageBase implements AfterViewInit, OnDestroy {
  /** Links shown in the page navbar. Each id must match a #revealSection id. */
  abstract readonly navLinks: NavLink[];

  activeSection = '';

  @ViewChildren('revealSection', { read: ElementRef })
  protected sections!: QueryList<ElementRef<HTMLElement>>;

  protected readonly cdr = inject(ChangeDetectorRef);

  private readonly sliders: SliderState[] = [];
  private revealObserver: IntersectionObserver | null = null;
  private navObserver: IntersectionObserver | null = null;
  private sectionsSub: Subscription | null = null;

  protected createSlider(total: () => number, perView: PerView, delay = 6000): SliderState {
    const slider = new SliderState(total, perView, delay, () => this.cdr.markForCheck());
    this.sliders.push(slider);
    return slider;
  }

  ngAfterViewInit(): void {
    this.observeReveal();
    this.observeActiveSection();
    this.sliders.forEach((slider) => slider.start());

    /* Sections inside @if blocks appear once the JSON has loaded:
       observe them (and start the sliders) when that happens. */
    this.sectionsSub = this.sections.changes.subscribe(() => {
      this.sections.forEach((section) => {
        this.revealObserver?.observe(section.nativeElement);
        this.navObserver?.observe(section.nativeElement);
      });
      this.sliders.forEach((slider) => {
        slider.clamp();
        slider.start();
      });
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.sectionsSub?.unsubscribe();
    this.revealObserver?.disconnect();
    this.navObserver?.disconnect();
    this.sliders.forEach((slider) => slider.stop());
  }

  @HostListener('window:resize')
  onResize(): void {
    this.sliders.forEach((slider) => {
      slider.clamp();
      slider.start();
    });
  }

  /** Hides a broken <img> so the fallback behind it shows instead. */
  hideImage(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  private observeReveal(): void {
    this.revealObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );

    this.sections.forEach((section) => this.revealObserver!.observe(section.nativeElement));
  }

  private observeActiveSection(): void {
    this.navObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && this.activeSection !== entry.target.id) {
            this.activeSection = entry.target.id;
            this.cdr.markForCheck();
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    this.sections.forEach((section) => this.navObserver!.observe(section.nativeElement));
  }
}
