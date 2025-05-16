import { TimeInterval } from '@/(app)/sub/create/_components/form-schema';
import { addDays, addMonths, addWeeks, addYears, startOfDay } from 'date-fns';

export function getEndDate(
  startAt: Date,
  duration: number,
  interval: TimeInterval,
): Date {
  const normalizedStart = startOfDay(startAt); // resets to 00:00 without timezone ambiguity

  switch (interval) {
    case 'day':
      return addDays(normalizedStart, duration);
    case 'week':
      return addWeeks(normalizedStart, duration);
    case 'month':
      return addMonths(normalizedStart, duration);
    case 'year':
      return addYears(normalizedStart, duration);
    default:
      return normalizedStart; // fallback if interval is invalid
  }
}
