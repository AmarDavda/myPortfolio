/* =========================================
   SLIDER LOGIC (shared by every slider)

   Same behaviour as the Home experience slider:
   - 3 cards per view on desktop
   - 2 cards per view <= 1050px
   - 1 card per view  <= 768px
   (the CSS variable --slide-width does the visual part,
    this class only needs to know how many cards fit so
    the last slide never shows an empty gap)
========================================= */
export type PerView = () => number;

export const responsive =
  (desktop: number, tablet: number, mobile: number): PerView =>
  () => {
    const width = typeof window === 'undefined' ? 1280 : window.innerWidth;
    if (width <= 768) return mobile;
    if (width <= 1050) return tablet;
    return desktop;
  };

export class SliderState {
  active = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private readonly total: () => number,
    private readonly perView: PerView,
    private readonly delay = 6000,
    private readonly onChange: () => void = () => {},
  ) {}

  /** Highest index the track can move to without showing empty space. */
  get maxIndex(): number {
    return Math.max(0, this.total() - this.perView());
  }

  get steps(): number[] {
    return Array.from({ length: this.maxIndex + 1 }, (_, i) => i);
  }

  get transform(): string {
    return `translateX(calc(-${this.active} * var(--slide-width)))`;
  }

  get progress(): number {
    return ((this.active + 1) / (this.maxIndex + 1)) * 100;
  }

  next(): void {
    this.active = this.active >= this.maxIndex ? 0 : this.active + 1;
  }

  prev(): void {
    this.active = this.active <= 0 ? this.maxIndex : this.active - 1;
  }

  go(index: number): void {
    this.active = Math.min(Math.max(index, 0), this.maxIndex);
  }

  /** Call after a resize so the active index is still valid. */
  clamp(): void {
    if (this.active > this.maxIndex) {
      this.active = this.maxIndex;
    }
    this.onChange();
  }

  start(): void {
    this.stop();
    if (this.maxIndex === 0) {
      return;
    }
    this.timer = setInterval(() => {
      this.next();
      this.onChange();
    }, this.delay);
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
