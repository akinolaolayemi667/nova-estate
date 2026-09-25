import { MotionConfig } from 'framer-motion';
import { RootLayout, SiteHeader } from '@/components/layout';
import { matchRoute, type AppRoute } from '@/lib/router';
import { FoundationPage } from '@/pages/FoundationPage';
import { HomePage } from '@/pages/HomePage';
import { PropertyPage } from '@/pages/PropertyPage';

const route = matchRoute(window.location.pathname);

function renderRoute(current: AppRoute) {
  switch (current.name) {
    case 'property':
      return <PropertyPage slug={current.slug} />;
    case 'design-system':
      return <FoundationPage />;
    default:
      return <HomePage />;
  }
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RootLayout header={<SiteHeader />}>{renderRoute(route)}</RootLayout>
    </MotionConfig>
  );
}
