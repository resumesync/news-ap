import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { NewsTable } from "@/components/admin/news-table";
import { useNewsAdmin } from "@/hooks/use-news";
import { PlusCircle } from "lucide-react";

export const Route = createFileRoute("/admin/news/")({
  component: AdminNewsIndex,
});

function AdminNewsIndex() {
  const { allNews, removeArticle, togglePublish } = useNewsAdmin();

  return (
    <AdminLayout
      title="News Management"
      description="Manage articles, dispatches, publishing status, and reader engagement"
      action={
        <Link
          to="/admin/news/new"
          className="inline-flex items-center gap-1.5 bg-brand hover:bg-brand/90 text-white px-3.5 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Write Article</span>
        </Link>
      }
    >
      <div className="space-y-6">
        <NewsTable
          news={allNews}
          onDelete={removeArticle}
          onTogglePublish={togglePublish}
        />
      </div>
    </AdminLayout>
  );
}
