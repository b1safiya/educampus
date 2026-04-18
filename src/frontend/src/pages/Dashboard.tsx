import { NoticeLineChart } from "@/components/charts/LineChart";
import { NoticePieChart } from "@/components/charts/PieChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNoticeStats, useNotices } from "@/hooks/useNotices";
import { CATEGORY_LABELS } from "@/types";
import type { NoticeCategory } from "@/types";
import { Link } from "@tanstack/react-router";

function StatCard({
  label,
  value,
  sub,
}: { label: string; value: string | number; sub?: string }) {
  return (
    <Card className="border-border">
      <CardContent className="p-5">
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="font-display font-bold text-3xl text-foreground mt-1 tabular-nums">
          {value}
        </p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  );
}

export function DashboardPage() {
  const { data: notices, isLoading: noticesLoading } = useNotices();
  const { data: stats, isLoading: statsLoading } = useNoticeStats();

  const pieData =
    stats?.perCategory.map((s) => ({
      category: s.category as NoticeCategory,
      count: s.count,
    })) ?? [];

  const lineData =
    stats?.perDay.map((d) => ({
      day: d.day,
      count: d.count,
    })) ?? [];

  const totalNotices = notices?.length ?? 0;
  const recentNotices =
    notices?.filter((n) => {
      const diff = Date.now() - new Date(n.date).getTime();
      return diff < 30 * 24 * 60 * 60 * 1000;
    }).length ?? 0;
  const categoriesUsed = new Set(notices?.map((n) => n.category)).size;

  return (
    <div
      className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto"
      data-ocid="dashboard.page"
    >
      {/* Header */}
      <div>
        <h1 className="font-display font-bold text-2xl text-foreground tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Analytics overview of the campus notice board
        </p>
      </div>

      {/* Stats row */}
      {noticesLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-5">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          data-ocid="dashboard.stats_section"
        >
          <StatCard label="Total Notices" value={totalNotices} sub="All time" />
          <StatCard
            label="Posted This Month"
            value={recentNotices}
            sub="Last 30 days"
          />
          <StatCard
            label="Categories Active"
            value={categoriesUsed}
            sub={`of ${4} total`}
          />
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie chart */}
        <Card className="border-border" data-ocid="dashboard.pie_chart_card">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base">
              Notices by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center justify-center h-56">
                <Skeleton className="h-48 w-48 rounded-full" />
              </div>
            ) : pieData.length > 0 ? (
              <NoticePieChart data={pieData} />
            ) : (
              <div className="flex items-center justify-center h-56 text-muted-foreground text-sm">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Line chart */}
        <Card className="border-border" data-ocid="dashboard.line_chart_card">
          <CardHeader className="pb-2">
            <CardTitle className="font-display text-base">
              Notices Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="space-y-2 pt-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton
                    key={i}
                    className={`h-3 w-${i % 2 === 0 ? "full" : "3/4"}`}
                  />
                ))}
              </div>
            ) : lineData.length > 0 ? (
              <NoticeLineChart data={lineData} />
            ) : (
              <div className="flex items-center justify-center h-56 text-muted-foreground text-sm">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent notices preview */}
      <Card className="border-border" data-ocid="dashboard.recent_notices">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base">
            Recent Notices
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {noticesLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 items-center">
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-16 ml-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {(notices ?? []).slice(0, 5).map((n, i) => (
                <Link
                  key={n.id}
                  to="/notices/$noticeId"
                  params={{ noticeId: n.id }}
                  className="flex items-center gap-3 py-3 hover:bg-muted/40 -mx-2 px-2 rounded-lg transition-smooth"
                  data-ocid={`dashboard.recent.item.${i + 1}`}
                >
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 ${
                      n.category === "Alert"
                        ? "bg-destructive/20 text-destructive border-destructive/30"
                        : n.category === "Event"
                          ? "bg-chart-1/20 text-chart-1 border-chart-1/30"
                          : n.category === "Assignment"
                            ? "bg-accent/20 text-accent-foreground border-accent/30"
                            : "bg-primary/20 text-primary border-primary/30"
                    }`}
                  >
                    {CATEGORY_LABELS[n.category as NoticeCategory] ??
                      n.category}
                  </span>
                  <span className="text-sm text-foreground truncate flex-1 min-w-0">
                    {n.title}
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {new Date(n.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
