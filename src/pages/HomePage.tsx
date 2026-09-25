import { FeaturedProperties, Hero, Locations, PropertyCategories } from '@/components/sections';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <PropertyCategories />
      <Locations />
    </>
  );
}
