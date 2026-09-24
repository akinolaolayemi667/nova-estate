import { Badge, type BadgeVariant } from '@/components/ui';
import { propertyStatusLabels } from '@/lib/format';
import type { PropertyStatus } from '@/lib/types';

const statusVariants: Record<PropertyStatus, BadgeVariant> = {
  'for-sale': 'overlay',
  'for-rent': 'overlay',
  reserved: 'bronze',
  sold: 'ink',
  'off-market': 'sage',
};

export interface PropertyStatusBadgeProps {
  status: PropertyStatus;
  className?: string;
}

export function PropertyStatusBadge({ status, className }: PropertyStatusBadgeProps) {
  return (
    <Badge variant={statusVariants[status]} className={className}>
      {propertyStatusLabels[status]}
    </Badge>
  );
}
