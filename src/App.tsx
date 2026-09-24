import { MotionConfig } from 'framer-motion';
import { RootLayout } from '@/components/layout';
import { FoundationPage } from '@/pages/FoundationPage';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RootLayout>
        <FoundationPage />
      </RootLayout>
    </MotionConfig>
  );
}
