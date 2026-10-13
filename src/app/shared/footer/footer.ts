import { CommonModule } from '@angular/common';
import { Component, Input, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../portfolio.service';

/* Same footer as the Home page, filled from portfolio.json */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['../theme.css', './footer.css'],
})
export class Footer {
  /** false = footer without the 'Have an idea?' call-to-action (used on the Contact page) */
  @Input() showCta = true;

  private readonly service = inject(PortfolioService);

  readonly footer = computed(() => this.service.data()?.footer ?? null);
  readonly contact = computed(() => this.service.data()?.contact ?? null);

  private find(title: string): string {
    return this.contact()?.item.find((i) => i.title === title)?.content ?? '';
  }

  get email(): string { return this.find('Email'); }
  get phone(): string { return this.find('Phone'); }
  get phoneLink(): string { return this.phone.replace(/[^+\d]/g, ''); }

  /** "Jasdan, Gujarat, India" taken from the end of the full address */
  get location(): string {
    const parts = this.find('Address').split(',').map((p) => p.trim());
    return parts.slice(-3).join(', ');
  }
}
