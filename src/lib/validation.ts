import type { InquiryFormErrors, InquiryFormValues } from '@/lib/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s-]{7,20}$/;

export function validateInquiry(values: InquiryFormValues): InquiryFormErrors {
  const errors: InquiryFormErrors = {};

  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Tell us a little more — at least 10 characters.';
  }
  if (values.type === 'viewing' && !values.propertyId) {
    errors.propertyId = 'Select the property you would like to view.';
  }
  if (!values.consent) errors.consent = 'Please agree to be contacted about your enquiry.';

  return errors;
}

export function hasErrors(errors: InquiryFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
