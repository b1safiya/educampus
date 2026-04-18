import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NoticeCategory } from "@/types";

interface CategoryFilterProps {
  active: NoticeCategory | undefined;
  onChange: (cat: NoticeCategory | undefined) => void;
}

const CATEGORIES: {
  label: string;
  value: NoticeCategory | undefined;
  color: string;
}[] = [
  {
    label: "All",
    value: undefined,
    color: "bg-muted text-foreground hover:bg-muted/80",
  },
  {
    label: "Announcement",
    value: "Announcement",
    color:
      "data-[active=true]:bg-primary/20 data-[active=true]:text-primary data-[active=true]:border-primary/40",
  },
  {
    label: "Event",
    value: "Event",
    color:
      "data-[active=true]:bg-chart-1/20 data-[active=true]:text-chart-1 data-[active=true]:border-chart-1/40",
  },
  {
    label: "Assignment",
    value: "Assignment",
    color:
      "data-[active=true]:bg-accent/20 data-[active=true]:text-accent-foreground data-[active=true]:border-accent/40",
  },
  {
    label: "Alert",
    value: "Alert",
    color:
      "data-[active=true]:bg-destructive/20 data-[active=true]:text-destructive data-[active=true]:border-destructive/40",
  },
];

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" data-ocid="notices.category_filter">
      {CATEGORIES.map(({ label, value, color }) => {
        const isActive = active === value;
        return (
          <button
            key={label}
            onClick={() => onChange(value)}
            data-active={isActive}
            data-ocid={`notices.filter.${label.toLowerCase()}`}
            type="button"
            className={cn(
              "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border border-transparent transition-smooth",
              color,
              isActive
                ? "shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
