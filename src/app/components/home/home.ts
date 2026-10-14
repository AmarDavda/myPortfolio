import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackToTop } from '../../shared/back-to-top/back-to-top';
import { Footer } from '../../shared/footer/footer';
import { PageBase } from '../../shared/page-base';
import { NavLink, PageNavbar } from '../../shared/page-navbar/page-navbar';
import { PortfolioService } from '../../shared/portfolio.service';

/* Home uses the same building blocks as About / Skill / Project / Contact:
   shared navbar, footer, back-to-top, and PageBase (scroll reveal + scroll-spy).
   All text and images come from public/data/portfolio.json */
@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, PageNavbar, Footer, BackToTop],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home extends PageBase {
  private readonly service = inject(PortfolioService);

  readonly data = this.service.data;
  readonly failed = this.service.failed;

  readonly navLinks: NavLink[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'footer', label: 'Contact' },
  ];

  /** "Amar Davda" -> "Amar" */
  firstName(name: string): string {
    return name.trim().split(/\s+/)[0] ?? '';
  }

  /** "Amar Davda" -> "Davda" */
  lastName(name: string): string {
    return name.trim().split(/\s+/).slice(1).join(' ');
  }

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
