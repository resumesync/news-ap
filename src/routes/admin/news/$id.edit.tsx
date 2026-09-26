import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { NewsForm } from "@/components/admin/news-form";
import { useNewsAdmin } from "@/hooks/use-news";

export const Route = createFileRoute("/admin/news/$id/edit")({
  component: AdminNewsEdit,
});

function AdminNewsEdit() {
  const { id } = Route.useParams();
  const { getNewsById, editArticle } = useNewsAdmin();

  const article = getNewsById(id);

  if (!article) {
    return (
      <AdminLayout title="Dispatch Not Found">
        <div className="py-12 text-center space-y-4">
          <p className="text-muted-foreground font-serif text-lg">
            Could not locate article with ID: {id}
          </p>
          <Link
            to="/admin/news"
            className="inline-block bg-brand text-white px-4 py-2 rounded-xs text-xs font-semibold uppercase"
          >
            ← Return to News Table
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Edit Dispatch"
      description={`Editing article: "${article.title}"`}
    >
      <NewsForm
        initialData={article}
        onSubmit={(updates) => editArticle(article.id, updates)}
        isEditing={true}
      />
    </AdminLayout>
  );
}
