export type User = {
  id: string;
  name: string;
};

export type Activity = {
  userId: string;
  type: string;
};


export function getMostActiveUserName(
  users: User[],
  activities: Activity[]
): string | null {
    if (activities.length === 0) return null;

    let count: Record<string, number> = {};
  
    for (const activity of activities) {
        count[activity.userId] = (count[activity.userId] ?? 0) + 1;
    }

    let maxUserId: string | null = null;
    let maxCount = 0;

    for (const userId in count) {
        if (count[userId] > maxCount) {
            maxUserId = userId;
            maxCount = count[userId]
        }
    }

    const user = users.find(u => u.id === maxUserId);
    return user ? user.name : null;
}