## Variables & basic types

```tsx
let count: number = 5;
const name: string = "Nina";
let isActive: boolean = true;
```

- **`const`** → the variable **cannot be reassigned**
- **`let`** → the variable **can be reassigned**

Type inference works (you don’t need to annotate everything):

```tsx
const age = 25; // inferred as number
```

## Functions

```tsx
function add(a: number, b: number): number {
  return a + b;
}
```

Arrow functions (very common):

```tsx
const add = (a: number, b: number): number => a + b;
```

If you forget the return type, TS often infers it.

## Objects: `type` and `interface`

```tsx
type User = {
  id: string;
  name: string;
  age?: number; // optional
};
```

Usage:

```tsx
const user: User = {
  id: "123",
  name: "Alice"
};
```

## Arrays & common operations

```tsx
const users: User[] = [];
```

Very common patterns:

```tsx
users.map(u => u.name);
users.filter(u => u.age && u.age > 18);
users.filter(u => activeUserIds.includes(u.id))
users.find(u => u.id === "123");
```

`==` is loose equality, `===` is strict equality

## Async / Await (super important)

If something is async, it returns a `Promise<T>`.

```tsx
async function getUser(): Promise<User> {
  return { id: "1", name: "Alice" };
}
```

Usage:

```tsx
const user = await getUser();
```

If you forget `await`, you’ll have a `Promise<User>` — classic bug.

## Error handling

```tsx
try {
  const user = await getUser();
} catch (err) {
  console.error(err);
}
```

## 7. Null / undefined (important gotcha)

You’ll see this:

```tsx
let user: User | undefined;
```

Which means:

- Could be a `User`
- Or could be `undefined`

You **must check**:

```tsx
if (!user) {
  throw new Error("User not found");
}
```

TS *forces* you to be explicit — this is a feature.

## 8. Imports / Exports

```tsx
export function add(a: number, b: number) {
  return a + b;
}
```

```tsx
import { add } from "./math";
```