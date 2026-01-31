export type User = {
  id: string;
  email: string;
};

export function countUsersByEmailDomain(
  users: User[]
): Record<string, number> {
  const result: Record<string, number> = {};

  for (const user of users) {
    const domain: string = user.email.split("@").at(-1) ?? "";
    result[domain] = (result[domain] ?? 0) + 1;
  }

  return result;
}