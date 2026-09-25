import { Container } from '@/components/ui';
import { announcement } from '@/data/navigation';

export function AnnouncementBar() {
  return (
    <div data-tone="navy" className="bg-navy text-ivory/85">
      <Container size="wide" className="flex h-9 items-center justify-center gap-3">
        <span aria-hidden="true" className="hidden h-px w-6 bg-gold sm:block" />
        <p className="text-center font-sans text-[0.5625rem] font-medium tracking-[0.18em] uppercase sm:text-[0.625rem] sm:tracking-[0.28em]">
          {announcement}
        </p>
        <span aria-hidden="true" className="hidden h-px w-6 bg-gold sm:block" />
      </Container>
    </div>
  );
}
