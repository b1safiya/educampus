import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export interface DayStat {
    date: string;
    count: bigint;
}
export interface CategoryStat {
    count: bigint;
    category: NoticeCategory;
}
export interface Notice {
    id: NoticeId;
    title: string;
    authorId: UserId;
    date: string;
    createdAt: Timestamp;
    description: string;
    fileLink?: string;
    category: NoticeCategory;
}
export type NoticeId = bigint;
export interface NoticeInput {
    title: string;
    date: string;
    description: string;
    fileLink?: string;
    category: NoticeCategory;
}
export interface UserProfile {
    principal: UserId;
    name: string;
    createdAt: Timestamp;
    role: UserRole;
    email: string;
}
export interface NoticeStats {
    perDay: Array<DayStat>;
    perCategory: Array<CategoryStat>;
}
export enum NoticeCategory {
    Event = "Event",
    Assignment = "Assignment",
    Announcement = "Announcement",
    Alert = "Alert"
}
export enum UserRole {
    admin = "admin",
    student = "student"
}
export enum UserRole__1 {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole__1): Promise<void>;
    createNotice(input: NoticeInput): Promise<Notice>;
    deleteNotice(id: NoticeId): Promise<boolean>;
    getAllNotices(): Promise<Array<Notice>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole__1>;
    getNoticeStats(): Promise<NoticeStats>;
    getNoticesByCategory(category: NoticeCategory): Promise<Array<Notice>>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    isAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isStudent(): Promise<boolean>;
    registerUserProfile(name: string, email: string, role: UserRole): Promise<UserProfile>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchNotices(term: string): Promise<Array<Notice>>;
    updateNotice(id: NoticeId, input: NoticeInput): Promise<Notice | null>;
}
