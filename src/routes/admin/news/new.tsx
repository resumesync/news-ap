import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { NewsForm } from "@/components/admin/news-form";
import { useNewsAdmin } from "@/hooks/use-news";

export const Route = createFileRoute("/admin/news/new")({
  component: AdminNewsNew,
});

function AdminNewsNew() {
  const { addArticle } = useNewsAdmin();

  return (
    <AdminLayout
      title="File New Dispatch"
      description="Author and publish a news article for the EIGHT NEWS journal"
    >
      <NewsForm onSubmit={addArticle} isEditing={false} />
    </AdminLayout>
  );
}
