import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Footer } from '../../shared/footer/footer';
import { BackToTop } from '../../shared/back-to-top/back-to-top';
import { PageBase } from '../../shared/page-base';
import { NavLink, PageNavbar } from '../../shared/page-navbar/page-navbar';
import { PortfolioService } from '../../shared/portfolio.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, PageNavbar, Footer, BackToTop],
  templateUrl: './contact.html',
  styleUrls: ['../../shared/theme.css', '../../shared/page.css', './contact.css'],
})
export class Contact extends PageBase {
  private readonly service = inject(PortfolioService);

  readonly data = this.service.data;
  readonly failed = this.service.failed;

  readonly navLinks: NavLink[] = [
    { id: 'connect', label: 'Say Hii!' },
    { id: 'details', label: 'Details' }
  ];

  /** Pre-filled "send email" link */
  readonly mailLink = computed(() => {
    const email = this.data()?.contact.item.find((i) => i.title === 'Email')?.content ?? '';
    const subject = encodeURIComponent('Hello Amar, I found your portfolio');
    const body = encodeURIComponent(
      `Hello Amar,

I found your portfolio and would like to connect with you.

Best regards,`
    );

    return `mailto:${email}?subject=${subject}&body=${body}`;
  });

  /** title of the detail that was just copied (shows "Copied ✓") */
  readonly copied = signal('');
  private copyTimer: ReturnType<typeof setTimeout> | null = null;

  async copy(title: string, text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* clipboard blocked: fall back to a hidden textarea */
      const area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    this.copied.set(title);
    if (this.copyTimer) clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => this.copied.set(''), 1800);
  }

  /** Address is a plain card (not a link on phones that open maps oddly), others are links */
  isCopyable(title: string): boolean {
    return title !== 'Address';
  }
}
