import { FeaturedProperties, Hero, Locations, PropertyCategories, PropertyShowcase, WhyNova } from '@/components/sections';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <PropertyCategories />
      <Locations />
      <PropertyShowcase />
      <WhyNova />
    </>
  );
}
