import { describe, it, expect } from "vitest";
import {
  getUserNamesActiveInLastNDays,
  User,
  Activity
} from "../src/task1";

describe("getUserNamesActiveInLastNDays", () => { // Creates a test suite
  // Fixture data
  const users: User[] = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" }
  ];

  const activities: Activity[] = [
    { userId: "1", lastActiveAt: new Date().toISOString() },
    { userId: "2", lastActiveAt: "2025-01-01T00:00:00Z" }
  ];

  it("returns only users active in the last 7 days", () => {
    const result = getUserNamesActiveInLastNDays(users, activities, 7);
    expect(result).toEqual(["Alice"]);
  });

  it("returns an empty array if no one is active", () => { // edge case
    const result = getUserNamesActiveInLastNDays(users, activities, 0);
    expect(result).toEqual([]);
  });
});
