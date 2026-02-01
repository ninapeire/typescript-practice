# TypeScript Interview Cheatsheet

## Variables & Basic Types

```ts
let count: number = 5;
const name: string = "Nina";
let isActive: boolean = true;
```

* `const` → cannot be reassigned
* `let` → can be reassigned
* Prefer `const` by default

### Type inference

```ts
const age = 25; // inferred as number
```

TypeScript infers types when it’s safe — explicit annotations are optional.

---

## Functions

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

Arrow functions:

```ts
const add = (a: number, b: number): number => a + b;
```

* Return types are usually inferred
* Explicit return types are useful for public APIs

---

## Objects: `type` vs `interface`

### Rule of thumb

> **Objects & public contracts → `interface`**
> **Everything else → `type`**

---

### `interface`

Used for **object shapes that may be extended or augmented**.

```ts
interface User {
  name: string;
  age?: number;
}
```

Key traits:

* **Open** (supports declaration merging)
* Extendable via `extends`
* Preferred for libraries, APIs, React props

```ts
interface Admin extends User {
  role: string;
}
```

---

### `type`

Used for **exact, closed definitions and composition**.

```ts
type UserId = string | number;
type Status = 'idle' | 'loading' | 'error';
```

Supports:

* unions
* tuples
* conditional & mapped types

```ts
type Result<T> =
  | { status: 'ok'; value: T }
  | { status: 'error'; error: string };
```

---

### Mental model

* `interface` → “others may build on this”
* `type` → “this is exactly what this is”

---

## Arrays & Common Operations

```ts
const users: User[] = [];
```

Common patterns:

```ts
users.map(u => u.name);
users.filter(u => u.age && u.age > 18);
users.find(u => u.name === "Alice");
```

Equality:

* `===` → strict equality (**always use**)
* `==` → loose equality (avoid)

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

Async functions return `Promise<T>`:

```ts
async function getUser(): Promise<User> {
  return { name: "Alice" };
}
```

Usage:

```ts
const user = await getUser();
```

⚠️ Forgetting `await` gives `Promise<User>` — common bug.

---

## Error Handling

```ts
try {
  const user = await getUser();
} catch (err) {
  console.error(err);
}
```

---

## `null` / `undefined` (very important)

```ts
let user: User | undefined;
```

You **must narrow**:

```ts
if (!user) {
  throw new Error("User not found");
}
```

This is a **feature**, not a nuisance.

---

### Optional chaining & nullish coalescing

```ts
user?.name ?? null;
```

* `?.` → safe property access
* `??` → fallback for `null | undefined`

⚠️ Unsafe:

```ts
user.name ?? null; // crashes if user is undefined
```

---

## Utility Types (high-value interview topic)

### `Partial<T>`

Makes all properties optional.

```ts
Partial<User>
```

### `Omit<T, K>`

Removes keys.

```ts
Omit<User, 'type'>
```

### Combine for filter criteria

```ts
Partial<Omit<User, 'type'>>
```

Reads as:

> “Any subset of `User`, excluding `type`.”

---

## Discriminated Unions & Type Guards

```ts
interface User {
  type: 'user';
  occupation: string;
}

interface Admin {
  type: 'admin';
  role: string;
}

type Person = User | Admin;
```

Type guards:

```ts
function isAdmin(p: Person): p is Admin {
  return p.type === 'admin';
}
```

Allows safe narrowing inside conditionals.

---

## Function Overloads (advanced but impressive)

Used when **types depend on argument values**.

```ts
function filterPersons(
  persons: Person[],
  type: 'user',
  criteria: Partial<Omit<User, 'type'>>
): User[];

function filterPersons(
  persons: Person[],
  type: 'admin',
  criteria: Partial<Omit<Admin, 'type'>>
): Admin[];
```

* Call signature changes based on `'user' | 'admin'`
* Implementation uses broader types
* Callers see precise return types

---

## `Object.keys` typing problem & solution

Problem:

```ts
Object.keys(obj); // string[]
```

Solution helper:

```ts
const getObjectKeys = <T>(obj: T) =>
  Object.keys(obj) as (keyof T)[];
```

Avoids repetitive casting.

---

## Modules

```ts
export function add(a: number, b: number) {
  return a + b;
}
```

```ts
import { add } from "./math.js"; // Node ESM
```