import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { BackToTop } from '../../shared/back-to-top/back-to-top';
import { PageBase } from '../../shared/page-base';
import { NavLink, PageNavbar } from '../../shared/page-navbar/page-navbar';
import { PortfolioService } from '../../shared/portfolio.service';

@Component({
  selector: 'app-skill',
  imports: [CommonModule, PageNavbar, Footer, BackToTop],
  templateUrl: './skill.html',
  styleUrls: ['../../shared/theme.css', '../../shared/page.css', './skill.css'],
})
export class Skill extends PageBase {
  private readonly service = inject(PortfolioService);

  readonly data = this.service.data;
  readonly failed = this.service.failed;

  /* One nav link per skill group, built from the JSON */
  private readonly links = computed<NavLink[]>(() => {
    const groups = (this.data()?.skills.categories ?? []).map((c) => ({
      id: c.id,
      label: SHORT_LABELS[c.id] ?? c.title,
    }));
    return [{ id: 'overview', label: 'Overview' }, ...groups];
  });

  get navLinks(): NavLink[] {
    return this.links();
  }

  readonly totalSkills = computed(
    () => this.data()?.skills.categories.reduce((sum, c) => sum + c.items.length, 0) ?? 0,
  );

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}

const SHORT_LABELS: Record<string, string> = {
  language: 'Languages',
  web: 'Web',
  database: 'Database',
  mobile: 'Mobile',
  soft: 'Soft Skills',
  tools: 'Tools',
};
