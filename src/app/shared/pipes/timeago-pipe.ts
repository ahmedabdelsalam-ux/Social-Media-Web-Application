import { Pipe, PipeTransform, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Pipe({
  name: 'timeago',
  pure: false,
})
export class TimeagoPipe implements PipeTransform, OnDestroy {
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(private cdRef: ChangeDetectorRef) {}

  transform(value: string | Date): string {
    this.startTimer();

    const now = new Date();
    const past = value instanceof Date ? value : new Date(value);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (seconds < 180) return 'Just now';

    const intervals: Record<string, number> = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (const key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);
      if (interval >= 1) {
        return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
      }
    }

    return 'Just now';
  }

  private startTimer(): void {
    if (this.timer) return;

    this.timer = setInterval(() => {
      this.cdRef.markForCheck();
    }, 30000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
