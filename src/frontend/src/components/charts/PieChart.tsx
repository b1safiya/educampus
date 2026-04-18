import { Skeleton } from "@/components/ui/skeleton";
import type { CategoryStat, NoticeCategory } from "@/types";
import { motion } from "motion/react";
import {
  Cell,
  Legend,
  Pie,
  PieChart as RechartsPie,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Map categories to CSS variable chart colors
const CHART_COLOR_VARS: Record<NoticeCategory, string> = {
  Announcement: "oklch(var(--primary))",
  Event: "oklch(var(--chart-1))",
  Assignment: "oklch(var(--chart-4))",
  Alert: "oklch(var(--destructive))",
};

interface NoticePieChartProps {
  data: CategoryStat[];
  isLoading?: boolean;
}

export function NoticePieChart({ data, isLoading }: NoticePieChartProps) {
  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-xl" />;
  }

  const chartData = data.map((d) => ({
    name: d.category,
    value: Number(d.count),
    color: CHART_COLOR_VARS[d.category],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="h-64"
      data-ocid="dashboard.pie_chart"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPie>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "oklch(var(--card))",
              border: "1px solid oklch(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
              color: "oklch(var(--card-foreground))",
            }}
            formatter={(value: number) => [`${value} notices`, ""]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
          />
        </RechartsPie>
      </ResponsiveContainer>
    </motion.div>
  );
}
