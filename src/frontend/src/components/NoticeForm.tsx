import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateNotice, useUpdateNotice } from "@/hooks/useNotices";
import type { Notice, NoticeCategory, NoticeInput } from "@/types";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface NoticeFormProps {
  notice?: Notice;
  onSuccess: () => void;
  onCancel: () => void;
}

const CATEGORIES: { value: NoticeCategory; label: string }[] = [
  { value: "Announcement", label: "Announcement" },
  { value: "Event", label: "Event" },
  { value: "Assignment", label: "Assignment" },
  { value: "Alert", label: "Alert" },
];

export function NoticeForm({ notice, onSuccess, onCancel }: NoticeFormProps) {
  const [title, setTitle] = useState(notice?.title ?? "");
  const [category, setCategory] = useState<NoticeCategory>(
    notice?.category ?? "Announcement",
  );
  const [description, setDescription] = useState(notice?.description ?? "");
  const [fileLink, setFileLink] = useState(notice?.fileLink ?? "");
  const [date, setDate] = useState(
    notice?.date ?? new Date().toISOString().split("T")[0],
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const create = useCreateNotice();
  const update = useUpdateNotice();
  const isPending = create.isPending || update.isPending;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!description.trim()) errs.description = "Description is required";
    if (!date) errs.date = "Date is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const input: NoticeInput = {
      title: title.trim(),
      category,
      description: description.trim(),
      fileLink: fileLink.trim() || undefined,
      date,
    };

    try {
      if (notice) {
        await update.mutateAsync({ id: notice.id, input });
      } else {
        await create.mutateAsync(input);
      }
      onSuccess();
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-ocid="notice_form">
      <div className="space-y-1.5">
        <Label htmlFor="nf-title">Title</Label>
        <Input
          id="nf-title"
          placeholder="Notice title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          data-ocid="notice_form.title_input"
        />
        {errors.title && (
          <p
            className="text-xs text-destructive"
            data-ocid="notice_form.title_field_error"
          >
            {errors.title}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="nf-category">Category</Label>
          <Select
            value={category}
            onValueChange={(v) => setCategory(v as NoticeCategory)}
          >
            <SelectTrigger
              id="nf-category"
              data-ocid="notice_form.category_select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="nf-date">Date</Label>
          <Input
            id="nf-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            data-ocid="notice_form.date_input"
          />
          {errors.date && (
            <p
              className="text-xs text-destructive"
              data-ocid="notice_form.date_field_error"
            >
              {errors.date}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="nf-desc">Description</Label>
        <Textarea
          id="nf-desc"
          placeholder="Describe the notice in detail..."
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-ocid="notice_form.description_textarea"
          className="resize-none"
        />
        {errors.description && (
          <p
            className="text-xs text-destructive"
            data-ocid="notice_form.description_field_error"
          >
            {errors.description}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="nf-file">
          Attachment URL{" "}
          <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="nf-file"
          type="url"
          placeholder="https://example.com/document.pdf"
          value={fileLink}
          onChange={(e) => setFileLink(e.target.value)}
          data-ocid="notice_form.file_input"
        />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isPending}
          data-ocid="notice_form.cancel_button"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          data-ocid="notice_form.submit_button"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {notice ? "Save changes" : "Publish notice"}
        </Button>
      </div>
    </form>
  );
}
