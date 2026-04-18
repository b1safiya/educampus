export type UserRole = "admin" | "student";

export interface UserProfile {
  principal: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: bigint;
}

export type NoticeCategory = "Announcement" | "Event" | "Assignment" | "Alert";

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  description: string;
  fileLink?: string;
  date: string;
  createdAt: bigint;
  authorId: string;
}

export interface NoticeInput {
  title: string;
  category: NoticeCategory;
  description: string;
  fileLink?: string;
  date: string;
}

export interface CategoryStat {
  category: NoticeCategory;
  count: bigint;
}

export interface DayStat {
  day: string;
  count: bigint;
}

export interface NoticeStats {
  perCategory: CategoryStat[];
  perDay: DayStat[];
}

export const CATEGORY_COLORS: Record<NoticeCategory, string> = {
  Announcement: "bg-primary/20 text-primary border-primary/30",
  Event: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  Assignment: "bg-accent/20 text-accent-foreground border-accent/30",
  Alert: "bg-destructive/20 text-destructive border-destructive/30",
};

export const CATEGORY_LABELS: Record<NoticeCategory, string> = {
  Announcement: "Announcement",
  Event: "Event",
  Assignment: "Assignment",
  Alert: "Alert",
};
