import { Component, HostListener } from '@angular/core';

/* Floating "back to top" button. Place it at the root of a page
   (NOT inside a .reveal-section, transforms break position:fixed). */
@Component({
  selector: 'app-back-to-top',
  standalone: true,
  template: `
    <button type="button" class="back-to-top" [class.show]="show" (click)="toTop()" aria-label="Back to top">
      ↑
    </button>
  `,
  styles: [
    `
      .back-to-top {
        position: fixed;
        right: 28px;
        bottom: 28px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 1px solid rgba(96, 165, 250, 0.25);
        border-radius: 7px;
        background: rgba(8, 12, 18, 0.94);
        backdrop-filter: blur(8px);
        color: #93c5fd;
        cursor: pointer;
        font-size: 17px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(18px);
        pointer-events: none;
        transition:
          opacity 0.3s ease,
          transform 0.3s ease,
          visibility 0.3s ease,
          border-color 0.3s ease,
          background 0.3s ease;
        z-index: 2000;
      }

      .back-to-top.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        pointer-events: auto;
      }

      .back-to-top:hover {
        transform: translateY(-4px);
        background: #101824;
        border-color: rgba(96, 165, 250, 0.6);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      }

      @media (max-width: 768px) {
        .back-to-top {
          right: 16px;
          bottom: 18px;
          width: 40px;
          height: 40px;
        }
      }
    `,
  ],
})
export class BackToTop {
  show = false;

  @HostListener('window:scroll')
  onScroll(): void {
    this.show = window.scrollY > 300;
  }

  toTop(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
