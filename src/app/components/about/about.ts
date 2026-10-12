import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../shared/footer/footer';
import { BackToTop } from '../../shared/back-to-top/back-to-top';
import { PageBase } from '../../shared/page-base';
import { NavLink, PageNavbar } from '../../shared/page-navbar/page-navbar';
import { PortfolioService } from '../../shared/portfolio.service';
import { Slider } from '../../shared/slider/slider';
import { responsive } from '../../shared/slider-state';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterLink, PageNavbar, Slider, Footer, BackToTop],
  templateUrl: './about.html',
  styleUrls: ['../../shared/theme.css', '../../shared/page.css', './about.css'],
})
export class About extends PageBase {
  private readonly service = inject(PortfolioService);

  readonly data = this.service.data;
  readonly failed = this.service.failed;

  readonly navLinks: NavLink[] = [
    { id: 'me', label: 'Me' },
    { id: 'education', label: 'Education' },
    { id: 'certification', label: 'Certification' },
    { id: 'my-info', label: 'My Info' },
    { id: 'contact', label: 'Contact' },
  ];

  /* cards per view: desktop / tablet (<=1050) / mobile (<=768) */
  readonly educationSlider = this.createSlider(
    () => this.data()?.education.length ?? 0,
    responsive(2, 2, 1),
    6500,
  );

  readonly certSlider = this.createSlider(
    () => this.data()?.certifications.length ?? 0,
    responsive(3, 2, 1),
    5500,
  );

  moreOpen = false;

  /* image viewer (result sheets + certificates) */
  viewerSrc = '';
  viewerTitle = '';

  openViewer(src: string, title: string): void {
    this.viewerSrc = src;
    this.viewerTitle = title;
  }

  @HostListener('document:keydown.escape')
  closeViewer(): void {
    this.viewerSrc = '';
  }
}
