import { MotionConfig } from 'framer-motion';
import { RootLayout, SiteHeader } from '@/components/layout';
import { FoundationPage } from '@/pages/FoundationPage';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RootLayout header={<SiteHeader />}>
        <FoundationPage />
      </RootLayout>
    </MotionConfig>
  );
}
