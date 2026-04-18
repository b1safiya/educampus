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
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useDeleteNotice, useNotice } from "@/hooks/useNotices";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  Edit2,
  ExternalLink,
  FileText,
  Loader2,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function NoticeDetailPage() {
  const { noticeId } = useParams({ from: "/notices/$noticeId" });
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { data: notice, isLoading } = useNotice(noticeId);
  const deleteNotice = useDeleteNotice();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteNotice.mutateAsync(noticeId);
      toast.success("Notice deleted");
      navigate({ to: "/notices" });
    } catch {
      toast.error("Failed to delete notice");
    }
  };

  if (isLoading) {
    return (
      <div
        className="p-4 sm:p-6 max-w-2xl mx-auto space-y-4"
        data-ocid="notice_detail.loading_state"
      >
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (!notice) {
    return (
      <div
        className="p-4 sm:p-6 max-w-2xl mx-auto text-center py-16"
        data-ocid="notice_detail.error_state"
      >
        <h2 className="font-display font-semibold text-xl text-foreground mb-2">
          Notice not found
        </h2>
        <p className="text-muted-foreground mb-4">
          This notice may have been removed.
        </p>
        <Button
          onClick={() => navigate({ to: "/notices" })}
          data-ocid="notice_detail.back_button"
        >
          Back to notices
        </Button>
      </div>
    );
  }

  return (
    <div
      className="p-4 sm:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in"
      data-ocid="notice_detail.page"
    >
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => navigate({ to: "/notices" })}
          data-ocid="notice_detail.back_button"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        {isAdmin && (
          <div className="ml-auto flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5"
              onClick={() => setShowEdit(true)}
              data-ocid="notice_detail.edit_button"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="gap-1.5"
              onClick={() => setShowDelete(true)}
              data-ocid="notice_detail.delete_button"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <Card className="border-border shadow-elevated">
        <CardContent className="p-5 sm:p-7 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className={`${CATEGORY_COLORS[notice.category]} border text-xs`}
            >
              <Tag className="h-3 w-3 mr-1" />
              {CATEGORY_LABELS[notice.category]}
            </Badge>
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(notice.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <h1 className="font-display font-bold text-2xl text-foreground leading-snug">
            {notice.title}
          </h1>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {notice.description}
            </p>
          </div>

          {notice.fileLink && (
            <div className="pt-2 border-t border-border">
              <a
                href={notice.fileLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-smooth text-sm font-medium"
                data-ocid="notice_detail.file_link"
              >
                <FileText className="h-4 w-4" />
                View attachment
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit modal */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent
          className="sm:max-w-lg"
          data-ocid="notice_detail.edit_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">Edit Notice</DialogTitle>
            <DialogDescription>Update this notice's details.</DialogDescription>
          </DialogHeader>
          <NoticeForm
            notice={notice}
            onSuccess={() => {
              setShowEdit(false);
              toast.success("Notice updated!");
            }}
            onCancel={() => setShowEdit(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
        <AlertDialogContent data-ocid="notice_detail.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display">
              Delete notice?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The notice will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="notice_detail.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDelete}
              disabled={deleteNotice.isPending}
              data-ocid="notice_detail.confirm_button"
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
