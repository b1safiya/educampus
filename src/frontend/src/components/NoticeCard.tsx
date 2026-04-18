import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Notice, NoticeCategory } from "@/types";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Edit2, ExternalLink, Trash2 } from "lucide-react";
import { motion } from "motion/react";

interface CategoryStyle {
  badge: string;
  border: string;
}

const CATEGORY_STYLES: Record<NoticeCategory, CategoryStyle> = {
  Announcement: {
    badge:
      "bg-primary/15 text-primary border border-primary/30 hover:bg-primary/25",
    border: "border-l-4 border-l-primary",
  },
  Event: {
    badge:
      "bg-[oklch(0.72_0.18_195/0.15)] text-chart-1 border border-chart-1/30 hover:bg-[oklch(0.72_0.18_195/0.25)]",
    border: "border-l-4 border-l-[oklch(var(--chart-1))]",
  },
  Assignment: {
    badge:
      "bg-accent/15 text-accent-foreground border border-accent/30 hover:bg-accent/25",
    border: "border-l-4 border-l-accent",
  },
  Alert: {
    badge:
      "bg-destructive/15 text-destructive border border-destructive/30 hover:bg-destructive/25",
    border: "border-l-4 border-l-destructive",
  },
};

interface NoticeCardProps {
  notice: Notice;
  index?: number;
  isAdmin?: boolean;
  onEdit?: (notice: Notice) => void;
  onDelete?: (notice: Notice) => void;
}

export function NoticeCard({
  notice,
  index = 0,
  isAdmin,
  onEdit,
  onDelete,
}: NoticeCardProps) {
  const style = CATEGORY_STYLES[notice.category];
  const formattedDate = new Date(notice.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: index * 0.07,
        ease: [0.4, 0, 0.2, 1],
      }}
      data-ocid={`notice.item.${index + 1}`}
    >
      <div
        className={cn(
          "group bg-card rounded-xl shadow-sm hover:shadow-md transition-smooth overflow-hidden",
          style.border,
        )}
      >
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold transition-smooth",
                    style.badge,
                  )}
                  data-ocid={`notice.category_badge.${index + 1}`}
                >
                  {notice.category}
                </span>
              </div>
              <Link
                to="/notices/$noticeId"
                params={{ noticeId: notice.id }}
                className="block"
                data-ocid={`notice.title_link.${index + 1}`}
              >
                <h3 className="font-display font-semibold text-foreground text-base leading-snug line-clamp-2 group-hover:text-primary transition-smooth">
                  {notice.title}
                </h3>
              </Link>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
            {notice.description}
          </p>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {notice.fileLink && (
                <a
                  href={notice.fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline transition-smooth"
                  data-ocid={`notice.file_link.${index + 1}`}
                >
                  <ExternalLink className="h-3 w-3" />
                  Attachment
                </a>
              )}

              {isAdmin && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => onEdit?.(notice)}
                    aria-label="Edit notice"
                    data-ocid={`notice.edit_button.${index + 1}`}
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => onDelete?.(notice)}
                    aria-label="Delete notice"
                    data-ocid={`notice.delete_button.${index + 1}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
