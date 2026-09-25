import type { LucideIcon } from 'lucide-react';

export interface PropertyCategoryEntry {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Decorative in the category tile — the category name labels the link. */
  image: string;
  href: string;
}
