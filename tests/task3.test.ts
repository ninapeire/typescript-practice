import { describe, it, expect } from "vitest";
import {
  User,
  Activity,
  getMostActiveUserName
} from "../src/task3";

describe("getMostActiveUserName", () => {
    const users: User[] = [
        { id: "1", name: "Alice" },
        { id: "2", name: "Bob" }
    ];

    const activities: Activity[] = [
        { userId: "1", type: "login" },
        { userId: "1", type: "view" },
        { userId: "2", type: "login" }
    ];

    it("returns the name of the most active user", () => {
        const result = getMostActiveUserName(users, activities);
        expect(result).toBe("Alice");
    });

    it("returns null if there are no activities", () => {
        const result = getMostActiveUserName(users, []);
        expect(result).toBeNull();
    });
});