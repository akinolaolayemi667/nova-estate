import { useRef } from 'react';
import { X } from 'lucide-react';
import { Container, Eyebrow, Heading, IconButton, Sheet } from '@/components/ui';
import type { SearchCriteria } from '@/lib/types';
import { SearchForm } from './SearchForm';

export const SEARCH_PANEL_ID = 'search-panel';
const TITLE_ID = 'search-panel-title';

export interface SearchPanelProps {
  open: boolean;
  onClose: () => void;
  onSearch?: (criteria: SearchCriteria) => void;
}

export function SearchPanel({ open, onClose, onSearch }: SearchPanelProps) {
  const locationInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (criteria: SearchCriteria) => {
    onSearch?.(criteria);
    onClose();
  };

  return (
    <Sheet
      open={open}
      onClose={onClose}
      side="top"
      id={SEARCH_PANEL_ID}
      labelledBy={TITLE_ID}
      initialFocusRef={locationInputRef}
    >
      <Container size="wide" className="py-8 md:py-14">
        <div className="flex items-start justify-between gap-6">
          <div className="flex flex-col gap-4">
            <Eyebrow>Property search</Eyebrow>
            <Heading id={TITLE_ID} level={2} size="h2">
              Where are you looking?
            </Heading>
          </div>
          <IconButton icon={X} label="Close search" onClick={onClose} className="-mt-1" />
        </div>
        <SearchForm onSubmit={handleSubmit} locationInputRef={locationInputRef} className="mt-10 md:mt-14" />
      </Container>
    </Sheet>
  );
}
