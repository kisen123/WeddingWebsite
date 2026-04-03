export const WEDDING_DATE = new Date('2027-08-28T12:00:00');
export const WEDDING_PLACE = 'Elgå, Norge';

/** Formatted as DD.MM.YYYY for display */
export const WEDDING_DATE_DISPLAY = WEDDING_DATE.toLocaleDateString('no-NO', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
