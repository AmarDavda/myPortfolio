import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { BackToTop } from '../../shared/back-to-top/back-to-top';
import { PageBase } from '../../shared/page-base';
import { NavLink, PageNavbar } from '../../shared/page-navbar/page-navbar';
import { PortfolioService } from '../../shared/portfolio.service';

@Component({
  selector: 'app-project',
  imports: [CommonModule, PageNavbar, Footer, BackToTop],
  templateUrl: './project.html',
  styleUrls: ['../../shared/theme.css', '../../shared/page.css', './project.css'],
})
export class Project extends PageBase {
  private readonly service = inject(PortfolioService);

  readonly data = this.service.data;
  readonly failed = this.service.failed;

  readonly navLinks: NavLink[] = [
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  /* category filter */
  readonly filter = signal('All');
  readonly categories = computed(() => {
    const all = (this.data()?.projects ?? []).map((p) => p.category).filter(Boolean);
    return ['All', ...Array.from(new Set(all))];
  });
  readonly visible = computed(() =>
    (this.data()?.projects ?? []).filter((p) => this.filter() === 'All' || p.category === this.filter()),
  );

  /* "read more" per card */
  private readonly expanded = signal<Set<string>>(new Set());

  isExpanded(name: string): boolean {
    return this.expanded().has(name);
  }

  toggle(name: string): void {
    const next = new Set(this.expanded());
    next.has(name) ? next.delete(name) : next.add(name);
    this.expanded.set(next);
  }

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
