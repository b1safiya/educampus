import { c as createLucideIcon, o as useParams, a as useNavigate, u as useAuth, r as reactExports, j as jsxRuntimeExports, S as Skeleton, B as Button, n as Badge, b as ue } from "./index-CTWTDStn.js";
import { P as Pen, T as Trash2, F as FileText, E as ExternalLink, D as Dialog, e as DialogContent, f as DialogHeader, g as DialogTitle, h as DialogDescription, N as NoticeForm, A as AlertDialog, i as AlertDialogContent, j as AlertDialogHeader, k as AlertDialogTitle, l as AlertDialogDescription, m as AlertDialogFooter, n as AlertDialogCancel, o as AlertDialogAction } from "./dialog-CtMu1ziD.js";
import { C as Card, d as CardContent } from "./card-DRgiFb1C.js";
import { c as useNotice, a as useDeleteNotice, C as CATEGORY_LABELS, b as CATEGORY_COLORS } from "./index-CcTWCLGJ.js";
import { L as LoaderCircle } from "./loader-circle-DkAjpYhq.js";
import "./index-Dy02WCVq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function NoticeDetailPage() {
  const { noticeId } = useParams({ from: "/notices/$noticeId" });
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = (user == null ? void 0 : user.role) === "admin";
  const { data: notice, isLoading } = useNotice(noticeId);
  const deleteNotice = useDeleteNotice();
  const [showEdit, setShowEdit] = reactExports.useState(false);
  const [showDelete, setShowDelete] = reactExports.useState(false);
  const handleDelete = async () => {
    try {
      await deleteNotice.mutateAsync(noticeId);
      ue.success("Notice deleted");
      navigate({ to: "/notices" });
    } catch {
      ue.error("Failed to delete notice");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 sm:p-6 max-w-2xl mx-auto space-y-4",
        "data-ocid": "notice_detail.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
        ]
      }
    );
  }
  if (!notice) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 sm:p-6 max-w-2xl mx-auto text-center py-16",
        "data-ocid": "notice_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-xl text-foreground mb-2", children: "Notice not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "This notice may have been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => navigate({ to: "/notices" }),
              "data-ocid": "notice_detail.back_button",
              children: "Back to notices"
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 sm:p-6 max-w-2xl mx-auto space-y-5 animate-fade-in",
      "data-ocid": "notice_detail.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "gap-1.5 -ml-2 text-muted-foreground hover:text-foreground",
              onClick: () => navigate({ to: "/notices" }),
              "data-ocid": "notice_detail.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                "Back"
              ]
            }
          ),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "secondary",
                size: "sm",
                className: "gap-1.5",
                onClick: () => setShowEdit(true),
                "data-ocid": "notice_detail.edit_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3.5 w-3.5" }),
                  "Edit"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "destructive",
                size: "sm",
                className: "gap-1.5",
                onClick: () => setShowDelete(true),
                "data-ocid": "notice_detail.delete_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                  "Delete"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 sm:p-7 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                className: `${CATEGORY_COLORS[notice.category]} border text-xs`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-3 w-3 mr-1" }),
                  CATEGORY_LABELS[notice.category]
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
              new Date(notice.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground leading-snug", children: notice.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose prose-sm dark:prose-invert max-w-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/80 leading-relaxed whitespace-pre-wrap", children: notice.description }) }),
          notice.fileLink && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: notice.fileLink,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-smooth text-sm font-medium",
              "data-ocid": "notice_detail.file_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4" }),
                "View attachment",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" })
              ]
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: showEdit, onOpenChange: setShowEdit, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          DialogContent,
          {
            className: "sm:max-w-lg",
            "data-ocid": "notice_detail.edit_dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display", children: "Edit Notice" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update this notice's details." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                NoticeForm,
                {
                  notice,
                  onSuccess: () => {
                    setShowEdit(false);
                    ue.success("Notice updated!");
                  },
                  onCancel: () => setShowEdit(false)
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showDelete, onOpenChange: setShowDelete, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "notice_detail.delete_dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { className: "font-display", children: "Delete notice?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This action cannot be undone. The notice will be permanently removed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "notice_detail.cancel_button", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              AlertDialogAction,
              {
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                onClick: handleDelete,
                disabled: deleteNotice.isPending,
                "data-ocid": "notice_detail.confirm_button",
                children: [
                  deleteNotice.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }) : null,
                  "Delete"
                ]
              }
            )
          ] })
        ] }) })
      ]
    }
  );
}
export {
  NoticeDetailPage
};
