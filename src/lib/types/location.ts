export interface Location {
  id: string;
  name: string;
  description: string;
  /** Decorative in location tiles — the location name labels the link. */
  image: string;
  href: string;
  /** Position on the abstract map panel, as percentages of its width and height. */
  marker: { x: number; y: number; labelSide: 'left' | 'right' };
}
