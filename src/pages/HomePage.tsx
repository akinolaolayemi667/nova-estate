import { FeaturedProperties, Hero, Locations, PropertyCategories, PropertyShowcase } from '@/components/sections';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <PropertyCategories />
      <Locations />
      <PropertyShowcase />
    </>
  );
}
