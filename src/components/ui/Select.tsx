import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { SelectOption } from '@/lib/types';
import { controlClasses } from './Input';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly SelectOption[];
}

/** Native select for full keyboard and screen-reader support, styled as an underlined field. */
export function Select({ options, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select className={cn(controlClasses, 'cursor-pointer appearance-none pr-8', className)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        strokeWidth={1.5}
        className="pointer-events-none absolute top-1/2 right-0 size-4 -translate-y-1/2 text-navy"
      />
    </div>
  );
}
