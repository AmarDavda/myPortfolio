import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SliderState } from '../slider-state';

/* =========================================
   <app-slider>
   Wraps cards (class="slider-card") in the same
   viewport / track / arrows / progress / dots
   used by the Home experience slider.

   The section around it decides how many cards
   show at once with .slides-3 or .slides-2 (page.css).
========================================= */
@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.html',
  styleUrls: ['../theme.css', './slider.css'],
})
export class Slider {
  @Input({ required: true }) state!: SliderState;
  @Input() label = 'item';

  private startX: number | null = null;

  pad(value: number): string {
    return String(value).padStart(2, '0');
  }

  /* Pause autoplay while a mouse hovers (touch taps must not pause it) */
  hoverStart(event: PointerEvent): void {
    if (event.pointerType === 'mouse') {
      this.state.stop();
    }
  }

  hoverEnd(event: PointerEvent): void {
    if (event.pointerType === 'mouse') {
      this.state.start();
    }
  }

  /* Swipe support for touch / pen */
  swipeStart(event: PointerEvent): void {
    if (event.pointerType === 'mouse') {
      return;
    }
    this.startX = event.clientX;
    this.state.stop();
  }

  swipeEnd(event: PointerEvent): void {
    if (event.pointerType === 'mouse' || this.startX === null) {
      return;
    }

    const distance = event.clientX - this.startX;
    this.startX = null;

    if (distance <= -45) {
      this.state.next();
    } else if (distance >= 45) {
      this.state.prev();
    }

    this.state.start();
  }

  swipeCancel(): void {
    this.startX = null;
    this.state.start();
  }
}
