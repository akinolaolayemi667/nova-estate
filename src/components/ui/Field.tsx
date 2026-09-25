import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface FieldRenderProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
}

export interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  /** Render prop so the control receives matching `id` and ARIA attributes. */
  children: (props: FieldRenderProps) => ReactNode;
}

export function Field({ label, hint, error, className, children }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="kicker text-muted">
        {label}
      </label>
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined })}
      {hint && !error && (
        <p id={hintId} className="text-caption text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-caption text-navy">
          {error}
        </p>
      )}
    </div>
  );
}
