import { Badge, type BadgeVariant } from '@/components/ui';
import { propertyStatusLabels } from '@/lib/format';
import type { PropertyStatus } from '@/lib/types';

const statusVariants: Record<PropertyStatus, BadgeVariant> = {
  'for-sale': 'overlay',
  'for-rent': 'overlay',
  reserved: 'gold',
  sold: 'navy',
  'off-market': 'navy',
};

export interface PropertyStatusBadgeProps {
  status: PropertyStatus;
  className?: string;
}

export function PropertyStatusBadge({ status, className }: PropertyStatusBadgeProps) {
  return (
    <Badge variant={statusVariants[status]} dot={status === 'for-sale'} className={className}>
      {propertyStatusLabels[status]}
    </Badge>
  );
}
