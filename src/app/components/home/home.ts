import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BackToTop } from '../../shared/back-to-top/back-to-top';
import { Footer } from '../../shared/footer/footer';
import { Experience } from '../../shared/portfolio.model';
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

  
  /* Experience list: with more than 3 entries only the first 2 show until "Show more" */
  private readonly expLimit = 3;
  private readonly expPreview = 2;
  showAllExperience = false;

  isLong(list: Experience[]): boolean {
    return list.length > this.expLimit;
  }

  visibleExperience(list: Experience[]): Experience[] {
    return this.isLong(list) && !this.showAllExperience ? list.slice(0, this.expPreview) : list;
  }

  toggleExperience(): void {
    this.showAllExperience = !this.showAllExperience;
    if (!this.showAllExperience) {
      // collapsing: bring the section start back into view
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  
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
