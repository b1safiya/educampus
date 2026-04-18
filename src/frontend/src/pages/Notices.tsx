import { NoticeForm } from "@/components/NoticeForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteNotice, useNotices } from "@/hooks/useNotices";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/types";
import type { Notice, NoticeCategory } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  Edit2,
  ExternalLink,
  FileText,
  Filter,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

function NoticeSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="border-border">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Skeleton className="h-5 w-24 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const CATEGORIES: NoticeCategory[] = [
  "Announcement",
  "Event",
  "Assignment",
  "Alert",
];

export function NoticesPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<NoticeCategory | "all">(
    "all",
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Debounce search
  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    const timer = setTimeout(() => setDebouncedSearch(val), 300);
    return () => clearTimeout(timer);
  }, []);

  const { data: notices, isLoading } = useNotices(
    debouncedSearch || undefined,
    categoryFilter !== "all" ? categoryFilter : undefined,
  );
  const deleteNotice = useDeleteNotice();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteNotice.mutateAsync(deleteId);
      toast.success("Notice deleted");
    } catch {
      toast.error("Failed to delete notice");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div
      className="p-4 sm:p-6 max-w-4xl mx-auto space-y-5"
      data-ocid="notices.page"
    >
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
            Notice Board
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isAdmin
              ? "Manage and publish campus notices"
              : "Stay up to date with campus announcements"}
          </p>
        </div>
        {isAdmin && (
          <Button
            onClick={() => setShowCreateModal(true)}
            className="gap-2 shrink-0"
            data-ocid="notices.add_button"
          >
            <Plus className="h-4 w-4" />
            Add Notice
          </Button>
        )}
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notices..."
            className="pl-9 pr-8"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            data-ocid="notices.search_input"
          />
          {search && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => handleSearch("")}
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <Select
          value={categoryFilter}
          onValueChange={(v) => setCategoryFilter(v as NoticeCategory | "all")}
        >
          <SelectTrigger
            className="w-full sm:w-44"
            data-ocid="notices.filter.select"
          >
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem
                key={cat}
                value={cat}
                data-ocid={`notices.filter.${cat.toLowerCase()}`}
              >
                {CATEGORY_LABELS[cat]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Notice list */}
      {isLoading ? (
        <NoticeSkeleton />
      ) : notices && notices.length > 0 ? (
        <div className="space-y-3" data-ocid="notices.list">
          {notices.map((notice, idx) => (
            <Card
              key={notice.id}
              className="border-border hover:shadow-elevated transition-smooth cursor-pointer group"
              onClick={() =>
                navigate({
                  to: "/notices/$noticeId",
                  params: { noticeId: notice.id },
                })
              }
              data-ocid={`notices.item.${idx + 1}`}
            >
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        className={`${CATEGORY_COLORS[notice.category]} border text-xs shrink-0`}
                        data-ocid={`notices.category_badge.${idx + 1}`}
                      >
                        {CATEGORY_LABELS[notice.category]}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Posted{" "}
                        {new Date(notice.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notice.description}
                    </p>
                    {notice.fileLink && (
                      <a
                        href={notice.fileLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-1"
                        onClick={(e) => e.stopPropagation()}
                        data-ocid={`notices.file_link.${idx + 1}`}
                      >
                        <FileText className="h-3.5 w-3.5" />
                        View attachment
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  {isAdmin && (
                    <div
                      className="flex items-center gap-1.5 shrink-0"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={() => {}}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-70 hover:opacity-100 hover:bg-muted"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingNotice(notice);
                        }}
                        aria-label="Edit notice"
                        data-ocid={`notices.edit_button.${idx + 1}`}
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-70 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(notice.id);
                        }}
                        aria-label="Delete notice"
                        data-ocid={`notices.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-16 text-center"
          data-ocid="notices.empty_state"
        >
          <div className="h-16 w-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2">
            {debouncedSearch || categoryFilter !== "all"
              ? "No notices found"
              : "No notices yet"}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            {debouncedSearch || categoryFilter !== "all"
              ? "Try adjusting your search or filter to find what you're looking for."
              : isAdmin
                ? "Create the first notice to get started."
                : "Check back later for campus updates."}
          </p>
          {isAdmin && !debouncedSearch && categoryFilter === "all" && (
            <Button
              className="mt-4 gap-2"
              onClick={() => setShowCreateModal(true)}
              data-ocid="notices.create_first_button"
            >
              <Plus className="h-4 w-4" />
              Create first notice
            </Button>
          )}
        </div>
      )}

      {/* Create modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent
          className="sm:max-w-lg"
          data-ocid="notices.create_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Add New Notice</DialogTitle>
            <DialogDescription>
              Fill in the details to publish a new campus notice.
            </DialogDescription>
          </DialogHeader>
          <NoticeForm
            onSuccess={() => {
              setShowCreateModal(false);
              toast.success("Notice published!");
            }}
            onCancel={() => setShowCreateModal(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit modal */}
      <Dialog
        open={!!editingNotice}
        onOpenChange={(o) => !o && setEditingNotice(null)}
      >
        <DialogContent className="sm:max-w-lg" data-ocid="notices.edit_dialog">
          <DialogHeader>
            <DialogTitle className="font-display">Edit Notice</DialogTitle>
            <DialogDescription>
              Update the notice details below.
            </DialogDescription>
          </DialogHeader>
          {editingNotice && (
            <NoticeForm
              notice={editingNotice}
              onSuccess={() => {
                setEditingNotice(null);
                toast.success("Notice updated!");
              }}
              onCancel={() => setEditingNotice(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent data-ocid="notices.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete notice?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The notice will be permanently
              removed from the board.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="notices.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              disabled={deleteNotice.isPending}
              data-ocid="notices.delete_confirm_button"
            >
              {deleteNotice.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
