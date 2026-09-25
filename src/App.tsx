import { MotionConfig } from 'framer-motion';
import { RootLayout, SiteHeader } from '@/components/layout';
import { routes } from '@/lib/routes';
import { FoundationPage } from '@/pages/FoundationPage';
import { HomePage } from '@/pages/HomePage';

const isDesignSystem = window.location.pathname.replace(/\/$/, '') === routes.designSystem;

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RootLayout header={<SiteHeader />}>{isDesignSystem ? <FoundationPage /> : <HomePage />}</RootLayout>
    </MotionConfig>
  );
}
