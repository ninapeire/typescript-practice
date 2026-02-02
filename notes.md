# TypeScript Cheatsheet

## Variables & Basic Types

```ts
const count: number = 5;
let name: string = "Nina";
let isActive: boolean = true;
```

* `const` → cannot be reassigned (**prefer by default**)
* `let` → can be reassigned
* Avoid `var`

### Type inference

```ts
const age = 25; // inferred as number
```

TypeScript infers types when safe — explicit annotations are optional but useful at boundaries.

---

## Functions

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Arrow functions:

```ts
const add = (a: number, b: number) => a + b;
```

* Return types usually inferred
* Explicit return types are useful for **public APIs**

---

## `type` vs `interface`

### Rule of thumb

> **Public object contracts → `interface`**
> **Exact definitions & composition → `type`**

---

### `interface`

Used for **object shapes that may be extended**.

```ts
interface User {
  id: string;
  name: string;
  age?: number;
}
```

Traits:

* Open (supports declaration merging)
* Extendable (`extends`)
* Preferred for APIs, libraries, React props

---

### `type`

Used for **closed, exact definitions**.

```ts
type UserId = string;
type Status = "idle" | "loading" | "error";
```

Great for:

* unions
* tuples
* mapped / conditional types

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };
```

---

## Arrays & Common Operations

```ts
const users: User[] = [];
```

```ts
users.map(u => u.name);
users.filter(u => u.age && u.age > 18);
users.find(u => u.id === "u1");
```

Equality:

* `===` → strict (always use)
* `==` → avoid

---

## Iteration

### `for...of` → values

```ts
for (const user of users) {
  // user: User
}
```

### `for...in` → keys

```ts
const counts: Record<string, number> = {};
for (const key in counts) {
  // key: string
}
```

Rule:

* Arrays → `for...of`
* Objects → `for...in`

---

## Async / Await

```ts
async function getUser(): Promise<User> {
  return { id: "1", name: "Alice" };
}
```

```ts
const user = await getUser();
```

⚠️ Forgetting `await` returns `Promise<User>`.

---

## Error Handling & Result Types (high-signal)

Prefer **explicit results** over throwing for expected failures.

```ts
type Ok<T> = { ok: true; value: T };
type Err = { ok: false; error: { message: string; status?: number } };
type Result<T> = Ok<T> | Err;
```

```ts
if (!result.ok) {
  console.error(result.error.message);
  return;
}
```

💬 Interview line:

> “I use discriminated unions so error handling is explicit and enforced.”

---

## `null` / `undefined`

```ts
let user: User | undefined;
```

You **must narrow**:

```ts
if (!user) throw new Error("User not found");
```

This is a feature, not friction.

### Optional chaining & nullish coalescing

```ts
user?.name ?? "Anonymous";
```

* `?.` → safe access
* `??` → fallback for `null | undefined`

---

## Parsing External Data (VERY important)

### `unknown` vs `any`

* `any` → disables type safety (avoid)
* `unknown` → forces validation (use for APIs)

---

### `Record<string, unknown>`

```ts
Record<string, unknown>
```

Means:

> “Object with string keys and **untrusted values**.”

Used when parsing API data.

---

### Safe parse pattern

```ts
function parseUser(input: unknown): User | null {
  if (typeof input !== "object" || input === null) return null;

  const record = input as Record<string, unknown>;

  if (typeof record.id !== "string") return null;
  if (typeof record.name !== "string") return null;

  return { id: record.id, name: record.name };
}
```

💬 Interview line:

> “I only construct domain types after proving runtime facts.”

---

## Utility Types (high ROI)

```ts
Partial<T>        // all optional
Pick<T, K>        // select keys
Omit<T, K>        // remove keys
Record<K, V>      // map type
```

Example:

```ts
Partial<Omit<User, "id">>
```

---

## Discriminated Unions & Type Guards

```ts
type Person =
  | { type: "user"; occupation: string }
  | { type: "admin"; role: string };
```

```ts
function isAdmin(p: Person): p is { type: "admin"; role: string } {
  return p.type === "admin";
}
```

---

## `reduce` (know the patterns)

### Sum

```ts
numbers.reduce((a, b) => a + b, 0);
```

### Index by id

```ts
users.reduce<Record<string, User>>((acc, u) => {
  acc[u.id] = u;
  return acc;
}, {});
```

### Group by

```ts
orders.reduce<Record<string, Order[]>>((acc, o) => {
  acc[o.userId] ??= [];
  acc[o.userId].push(o);
  return acc;
}, {});
```

💬 Interview note:

> “I use `reduce` when building structures; otherwise `map`/`filter`.”

---

## Testing (Jest / Vitest)

### Matchers

* `toBe` → primitives, identity
* `toEqual` → objects & arrays
* `toBeCloseTo` → floats

```ts
expect(4.5).toBe(4.5);
expect({ a: 1 }).toEqual({ a: 1 });
expect(1.666).toBeCloseTo(1.67, 2);
```

---

## `as const` (surprisingly important)

```ts
const status = {
  ok: "ok",
  error: "error",
} as const;
```

* Prevents type widening
* Enables discriminated unions
* Makes literals stay literal

---

## `Object.keys` typing fix

```ts
const getKeys = <T>(obj: T) =>
  Object.keys(obj) as (keyof T)[];
```

---

## Modules

```ts
export function add(a: number, b: number) {
  return a + b;
}
```

```ts
import { add } from "./math.js";
```

---

## `type` vs `class`

* `type` → compile-time only, data shapes
* `class` → runtime behavior, state, identity

**Rule:**

> Use `type` for data, `class` for behavior.