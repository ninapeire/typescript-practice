export type User = {
  id: string;
  name: string;
};

export type Activity = {
  userId: string;
  lastActiveAt: string;
};

export const parseISOToDate = (iso: string): Date =>
  new Date(iso);

export const isInLastNDays = (date: Date, days: number): boolean => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return date >= cutoff;
};

export function getUserNamesActiveInLastNDays(
  users: User[],
  activities: Activity[],
  days: number
): string[] {
  const activeUserIds = activities
    .filter(a => isInLastNDays(parseISOToDate(a.lastActiveAt), days))
    .map(a => a.userId);

  const idSet = new Set(activeUserIds);

  return users
    .filter(u => idSet.has(u.id))
    .map(u => u.name);
}