type User = {
  id: string;
  name: string;
};

type Activity = {
  userId: string;
  lastActiveAt: string; // ISO date string
};

const users: User[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" }
];

const activities: Activity[] = [
  { userId: "1", lastActiveAt: "2026-01-25T10:00:00Z" },
  { userId: "2", lastActiveAt: "2025-12-01T10:00:00Z" }
];



// Write a function that returns the names of users who were active in the last 7 days.

/* 
Think aloud:
    “Okay, I want to compare dates, so I’ll parse the ISO string into a Date object.
    Then I’ll compute a cutoff date for 7 days ago.
    I’ll filter activities newer than that and map user IDs to names.”
*/

const parseISOToDate = (iso: string): Date => {
  return new Date(iso);
};

const isInLastNDays = (date: Date, days: number): boolean => {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return date >= cutoff;
};

function getUserNamesActiveInLastNDays(
  users: User[],
  activities: Activity[],
  days: number
): string[] {
  const activeUserIds = activities
    .filter(a => isInLastNDays(parseISOToDate(a.lastActiveAt), days))
    .map(a => a.userId);
  const activeUserIdSet = new Set(activeUserIds);

  return users
    .filter(u => activeUserIds.includes(u.id))
    .map(u => u.name);
}





// // “I’m going to ask ChatGPT to sanity-check edge cases and time complexity.”

// import { describe, it, expect } from "vitest";

// it("returns users active in last 7 days", () => {
//   const result = getRecentlyActiveUserNames(users, activities, 7);
//   expect(result).toEqual(["Alice"]);
// });






// Try it
console.log(getUserNamesActiveInLastNDays(users, activities, 7));
