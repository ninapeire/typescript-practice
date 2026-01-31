import { describe, it, expect } from "vitest";
import {
  countUsersByEmailDomain,
  User
} from "../src/task2";

describe("countUsersByEmailDomain", () => {
    const users: User[] = [
        { id: "1", email: "alice@gmail.com" },
        { id: "2", email: "bob@gmail.com" },
        { id: "3", email: "carol@yahoo.com" }
    ];

    it("returns count of email domains in fixture", () => {
        const result = countUsersByEmailDomain(users);
        expect(result).toEqual({
            "gmail.com": 2,
            "yahoo.com": 1
            });
    })
})