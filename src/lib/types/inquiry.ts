export const INQUIRY_TYPES = ['viewing', 'buying', 'selling', 'consultation', 'general'] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export interface InquiryFormValues {
  type: InquiryType;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  preferredDate?: string;
  consent: boolean;
}

export type InquiryFormErrors = Partial<Record<keyof InquiryFormValues, string>>;

export type InquiryStatus = 'idle' | 'submitting' | 'success' | 'error';
