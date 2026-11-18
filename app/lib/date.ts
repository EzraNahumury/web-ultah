/**
 * Birthday date helpers. Pure functions — safe to call from client components.
 * All "now" values are passed in so nothing reads the clock at module scope
 * (which would break prerendering under Next's Cache Components).
 */

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number; // ms remaining
}

/** The next occurrence of month/day at local midnight, relative to `now`. */
export function getNextBirthday(month: number, day: number, now: Date): Date {
  const year = now.getFullYear();
  let target = new Date(year, month - 1, day, 0, 0, 0, 0);
  // If this year's birthday has fully passed, roll to next year.
  const endOfBirthday = new Date(year, month - 1, day + 1, 0, 0, 0, 0);
  if (now.getTime() >= endOfBirthday.getTime()) {
    target = new Date(year + 1, month - 1, day, 0, 0, 0, 0);
  }
  return target;
}

/** True when `now` falls on the birthday calendar day. */
export function isBirthdayToday(month: number, day: number, now: Date): boolean {
  return now.getMonth() === month - 1 && now.getDate() === day;
}

export function getCountdown(target: Date, now: Date): CountdownParts {
  const total = Math.max(0, target.getTime() - now.getTime());
  const seconds = Math.floor(total / 1000) % 60;
  const minutes = Math.floor(total / (1000 * 60)) % 60;
  const hours = Math.floor(total / (1000 * 60 * 60)) % 24;
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds, total };
}
