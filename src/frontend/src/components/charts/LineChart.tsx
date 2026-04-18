import { Skeleton } from "@/components/ui/skeleton";
import type { DayStat } from "@/types";
import { motion } from "motion/react";
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface NoticeLineChartProps {
  data: DayStat[];
  isLoading?: boolean;
}

export function NoticeLineChart({ data, isLoading }: NoticeLineChartProps) {
  if (isLoading) {
    return <Skeleton className="h-64 w-full rounded-xl" />;
  }

  const chartData = data.map((d) => ({
    day: d.day,
    count: Number(d.count),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="h-64"
      data-ocid="dashboard.line_chart"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLine data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="oklch(var(--border))" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, fill: "oklch(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            contentStyle={{
              background: "oklch(var(--card))",
              border: "1px solid oklch(var(--border))",
              borderRadius: "8px",
              fontSize: "12px",
              color: "oklch(var(--card-foreground))",
            }}
            formatter={(value: number) => [`${value}`, "Notices"]}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="oklch(var(--primary))"
            strokeWidth={2.5}
            dot={{ fill: "oklch(var(--primary))", strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: "oklch(var(--primary))" }}
          />
        </RechartsLine>
      </ResponsiveContainer>
    </motion.div>
  );
}
