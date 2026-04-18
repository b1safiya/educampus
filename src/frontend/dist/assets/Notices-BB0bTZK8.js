import { c as createLucideIcon, u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as Button, X, n as Badge, b as ue, S as Skeleton } from "./index-CTWTDStn.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, F as FileText, E as ExternalLink, P as Pen, T as Trash2, D as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle, h as DialogDescription, N as NoticeForm, A as AlertDialog, i as AlertDialogContent, j as AlertDialogHeader, k as AlertDialogTitle, l as AlertDialogDescription, m as AlertDialogFooter, n as AlertDialogCancel, o as AlertDialogAction } from "./dialog-CtMu1ziD.js";
import { C as Card, d as CardContent } from "./card-DRgiFb1C.js";
import { I as Input } from "./index-Dy02WCVq.js";
import { u as useNotices, a as useDeleteNotice, C as CATEGORY_LABELS, b as CATEGORY_COLORS } from "./index-CcTWCLGJ.js";
import { L as LoaderCircle } from "./loader-circle-DkAjpYhq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function NoticeSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-24 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
    ] })
  ] }) }) }, i)) });
}
const CATEGORIES = [
  "Announcement",
  "Event",
  "Assignment",
  "Alert"
];
function NoticesPage() {
  const { user } = useAuth();
  const isAdmin = (user == null ? void 0 : user.role) === "admin";
  const navigate = useNavigate();
  const [search, setSearch] = reactExports.useState("");
  const [debouncedSearch, setDebouncedSearch] = reactExports.useState("");
  const [categoryFilter, setCategoryFilter] = reactExports.useState(
    "all"
  );
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [editingNotice, setEditingNotice] = reactExports.useState(null);
  const [deleteId, setDeleteId] = reactExports.useState(null);
  const handleSearch = reactExports.useCallback((val) => {
    setSearch(val);
    const timer = setTimeout(() => setDebouncedSearch(val), 300);
    return () => clearTimeout(timer);
  }, []);
  const { data: notices, isLoading } = useNotices(
    debouncedSearch || void 0,
    categoryFilter !== "all" ? categoryFilter : void 0
  );
  const deleteNotice = useDeleteNotice();
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteNotice.mutateAsync(deleteId);
      ue.success("Notice deleted");
    } catch {
      ue.error("Failed to delete notice");
    } finally {
      setDeleteId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 sm:p-6 max-w-4xl mx-auto space-y-5",
      "data-ocid": "notices.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground tracking-tight", children: "Notice Board" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: isAdmin ? "Manage and publish campus notices" : "Stay up to date with campus announcements" })
          ] }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => setShowCreateModal(true),
              className: "gap-2 shrink-0",
              "data-ocid": "notices.add_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                "Add Notice"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                placeholder: "Search notices...",
                className: "pl-9 pr-8",
                value: search,
                onChange: (e) => handleSearch(e.target.value),
                "data-ocid": "notices.search_input"
              }
            ),
            search && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground",
                onClick: () => handleSearch(""),
                "aria-label": "Clear search",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: categoryFilter,
              onValueChange: (v) => setCategoryFilter(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  SelectTrigger,
                  {
                    className: "w-full sm:w-44",
                    "data-ocid": "notices.filter.select",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 mr-2 text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All categories" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All categories" }),
                  CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectItem,
                    {
                      value: cat,
                      "data-ocid": `notices.filter.${cat.toLowerCase()}`,
                      children: CATEGORY_LABELS[cat]
                    },
                    cat
                  ))
                ] })
              ]
            }
          )
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(NoticeSkeleton, {}) : notices && notices.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "notices.list", children: notices.map((notice, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "border-border hover:shadow-elevated transition-smooth cursor-pointer group",
            onClick: () => navigate({
              to: "/notices/$noticeId",
              params: { noticeId: notice.id }
            }),
            "data-ocid": `notices.item.${idx + 1}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `${CATEGORY_COLORS[notice.category]} border text-xs shrink-0`,
                      "data-ocid": `notices.category_badge.${idx + 1}`,
                      children: CATEGORY_LABELS[notice.category]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "Posted",
                    " ",
                    new Date(notice.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug", children: notice.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: notice.description }),
                notice.fileLink && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "a",
                  {
                    href: notice.fileLink,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-1",
                    onClick: (e) => e.stopPropagation(),
                    "data-ocid": `notices.file_link.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }),
                      "View attachment",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
                    ]
                  }
                )
              ] }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-1.5 shrink-0",
                  onClick: (e) => e.stopPropagation(),
                  onKeyDown: () => {
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "h-8 w-8 opacity-70 hover:opacity-100 hover:bg-muted",
                        onClick: (e) => {
                          e.stopPropagation();
                          setEditingNotice(notice);
                        },
                        "aria-label": "Edit notice",
                        "data-ocid": `notices.edit_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "h-8 w-8 opacity-70 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive",
                        onClick: (e) => {
                          e.stopPropagation();
                          setDeleteId(notice.id);
                        },
                        "aria-label": "Delete notice",
                        "data-ocid": `notices.delete_button.${idx + 1}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" })
                      }
                    )
                  ]
                }
              )
            ] }) })
          },
          notice.id
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 text-center",
            "data-ocid": "notices.empty_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-8 w-8 text-muted-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: debouncedSearch || categoryFilter !== "all" ? "No notices found" : "No notices yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm", children: debouncedSearch || categoryFilter !== "all" ? "Try adjusting your search or filter to find what you're looking for." : isAdmin ? "Create the first notice to get started." : "Check back later for campus updates." }),
              isAdmin && !debouncedSearch && categoryFilter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  className: "mt-4 gap-2",
                  onClick: () => setShowCreateModal(true),
                  "data-ocid": "notices.create_first_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                    "Create first notice"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showCreateModal, onOpenChange: setShowCreateModal, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "sm:max-w-lg",
            "data-ocid": "notices.create_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Add New Notice" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Fill in the details to publish a new campus notice." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NoticeForm,
                {
                  onSuccess: () => {
                    setShowCreateModal(false);
                    ue.success("Notice published!");
                  },
                  onCancel: () => setShowCreateModal(false)
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Dialog,
          {
            open: !!editingNotice,
            onOpenChange: (o) => !o && setEditingNotice(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg", "data-ocid": "notices.edit_dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Notice" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update the notice details below." })
              ] }),
              editingNotice && /* @__PURE__ */ jsxRuntimeExports.jsx(
                NoticeForm,
                {
                  notice: editingNotice,
                  onSuccess: () => {
                    setEditingNotice(null);
                    ue.success("Notice updated!");
                  },
                  onCancel: () => setEditingNotice(null)
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialog,
          {
            open: !!deleteId,
            onOpenChange: (o) => !o && setDeleteId(null),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "notices.delete_dialog", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display", children: "Delete notice?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. The notice will be permanently removed from the board." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "notices.delete_cancel_button", children: "Cancel" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  AlertDialogAction,
                  {
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    onClick: handleDelete,
                    disabled: deleteNotice.isPending,
                    "data-ocid": "notices.delete_confirm_button",
                    children: [
                      deleteNotice.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
                      "Delete"
                    ]
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
export {
  NoticesPage
};
