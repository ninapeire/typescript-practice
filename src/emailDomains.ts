type User = {
  id: string;
  email: string;
};

const users: User[] = [
  { id: "1", email: "alice@gmail.com" },
  { id: "2", email: "bob@gmail.com" },
  { id: "3", email: "carol@yahoo.com" }
];






// Goal
// countUsersByEmailDomain(users);

// Expected output:
// {
//   "gmail.com": 2,
//   "yahoo.com": 1
// }