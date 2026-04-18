import type {
  CategoryStat,
  DayStat,
  Notice,
  NoticeCategory,
  NoticeInput,
  NoticeStats,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Seed data for initial load — realistic campus notices
const SEED_NOTICES: Notice[] = [
  {
    id: "1",
    title: "End-of-Semester Exam Schedule Released",
    category: "Announcement",
    description:
      "The final examination schedule for the current semester has been published. Students are advised to check their individual timetables and prepare accordingly. Any clashes must be reported to the academic office within 48 hours.",
    fileLink: "https://example.com/exam-schedule.pdf",
    date: "2026-04-15",
    createdAt: BigInt(1713139200000),
    authorId: "admin-1",
  },
  {
    id: "2",
    title: "Upcoming Webinar: Career Paths in Data Science",
    category: "Event",
    description:
      "Join us for an insightful webinar featuring industry experts from top tech companies. Learn about career opportunities in data science, machine learning, and AI. Registration is free for all enrolled students.",
    fileLink: undefined,
    date: "2026-04-20",
    createdAt: BigInt(1713225600000),
    authorId: "admin-1",
  },
  {
    id: "3",
    title: "Deadline Extended: Research Project Proposals",
    category: "Assignment",
    description:
      "The submission deadline for research project proposals has been extended to April 30th, 2026. All students must submit their proposals through the online portal. Late submissions will not be accepted after the new deadline.",
    fileLink: undefined,
    date: "2026-04-30",
    createdAt: BigInt(1713312000000),
    authorId: "admin-2",
  },
  {
    id: "4",
    title: "Emergency Campus Maintenance Closure",
    category: "Alert",
    description:
      "The main library and computer labs will be closed on April 19th for emergency electrical maintenance. All students are advised to plan accordingly. The facilities will reopen on April 20th at 8:00 AM.",
    fileLink: undefined,
    date: "2026-04-19",
    createdAt: BigInt(1713398400000),
    authorId: "admin-1",
  },
  {
    id: "5",
    title: "Spring Cultural Fest 2026 — Call for Participants",
    category: "Event",
    description:
      "The annual Spring Cultural Fest is back! We invite all students to participate in dance, music, drama, and art competitions. Register your team at the Student Activities Center by April 25th.",
    fileLink: "https://example.com/cultural-fest-details.pdf",
    date: "2026-05-10",
    createdAt: BigInt(1713484800000),
    authorId: "admin-2",
  },
  {
    id: "6",
    title: "Scholarship Applications Open for 2026-27",
    category: "Announcement",
    description:
      "Applications for merit-based and need-based scholarships for the academic year 2026-27 are now open. Eligible students can apply online through the financial aid portal. The deadline is May 15th, 2026.",
    fileLink: "https://example.com/scholarship-form.pdf",
    date: "2026-05-15",
    createdAt: BigInt(1713571200000),
    authorId: "admin-1",
  },
];

// In-memory store for demo purposes (replaces backend canister)
let noticesStore: Notice[] = [...SEED_NOTICES];
let nextId = noticesStore.length + 1;

function generateStats(notices: Notice[]): NoticeStats {
  const catMap: Record<string, number> = {};
  const dayMap: Record<string, number> = {};

  for (const n of notices) {
    catMap[n.category] = (catMap[n.category] ?? 0) + 1;
    const month = new Date(n.date).toLocaleString("default", {
      month: "short",
    });
    dayMap[month] = (dayMap[month] ?? 0) + 1;
  }

  const perCategory: CategoryStat[] = Object.entries(catMap).map(
    ([category, count]) => ({
      category: category as NoticeCategory,
      count: BigInt(count),
    }),
  );

  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const perDay: DayStat[] = Object.entries(dayMap)
    .sort((a, b) => monthOrder.indexOf(a[0]) - monthOrder.indexOf(b[0]))
    .map(([day, count]) => ({ day, count: BigInt(count) }));

  return { perCategory, perDay };
}

export function useNotices(searchTerm?: string, category?: NoticeCategory) {
  return useQuery<Notice[]>({
    queryKey: ["notices", searchTerm, category],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300)); // simulate latency
      let results = [...noticesStore];
      if (searchTerm) {
        const lower = searchTerm.toLowerCase();
        results = results.filter(
          (n) =>
            n.title.toLowerCase().includes(lower) ||
            n.description.toLowerCase().includes(lower),
        );
      }
      if (category) {
        results = results.filter((n) => n.category === category);
      }
      return results.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
    },
  });
}

export function useNotice(id: string) {
  return useQuery<Notice | undefined>({
    queryKey: ["notice", id],
    queryFn: async () => noticesStore.find((n) => n.id === id),
    enabled: !!id,
  });
}

export function useNoticeStats() {
  return useQuery<NoticeStats>({
    queryKey: ["noticeStats"],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 300));
      return generateStats(noticesStore);
    },
  });
}

export function useCreateNotice() {
  const qc = useQueryClient();
  return useMutation<Notice, Error, NoticeInput>({
    mutationFn: async (input) => {
      await new Promise((r) => setTimeout(r, 400));
      const notice: Notice = {
        ...input,
        id: String(nextId++),
        createdAt: BigInt(Date.now()),
        authorId: "admin-1",
        fileLink: input.fileLink ?? undefined,
      };
      noticesStore = [notice, ...noticesStore];
      return notice;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notices"] });
      qc.invalidateQueries({ queryKey: ["noticeStats"] });
    },
  });
}

export function useUpdateNotice() {
  const qc = useQueryClient();
  return useMutation<Notice | null, Error, { id: string; input: NoticeInput }>({
    mutationFn: async ({ id, input }) => {
      await new Promise((r) => setTimeout(r, 400));
      const idx = noticesStore.findIndex((n) => n.id === id);
      if (idx === -1) return null;
      noticesStore[idx] = {
        ...noticesStore[idx],
        ...input,
        fileLink: input.fileLink ?? undefined,
      };
      return noticesStore[idx];
    },
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: ["notices"] });
      qc.invalidateQueries({ queryKey: ["notice", id] });
      qc.invalidateQueries({ queryKey: ["noticeStats"] });
    },
  });
}

export function useDeleteNotice() {
  const qc = useQueryClient();
  return useMutation<boolean, Error, string>({
    mutationFn: async (id) => {
      await new Promise((r) => setTimeout(r, 300));
      const before = noticesStore.length;
      noticesStore = noticesStore.filter((n) => n.id !== id);
      return noticesStore.length < before;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notices"] });
      qc.invalidateQueries({ queryKey: ["noticeStats"] });
    },
  });
}

export function useRegisterProfile() {
  return useMutation<
    void,
    Error,
    { name: string; email: string; role: "admin" | "student" }
  >({
    mutationFn: async (_input) => {
      await new Promise((r) => setTimeout(r, 500));
      // In real usage: actor.registerUserProfile(name, email, role)
    },
  });
}
