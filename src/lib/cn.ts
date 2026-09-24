type ClassValue = string | number | boolean | null | undefined | ClassValue[];

/** Joins truthy class names. Components avoid conflicting utilities by design. */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === 'string' || typeof input === 'number') {
      classes.push(String(input));
    }
  }

  return classes.join(' ');
}
