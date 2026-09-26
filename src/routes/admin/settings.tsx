import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/admin/admin-layout";
import { SettingsForm } from "@/components/admin/settings-form";
import { useSettings } from "@/hooks/use-settings";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const { settings, update } = useSettings();

  return (
    <AdminLayout
      title="Publication Settings"
      description="Configure masthead identity, default ad frequency, themes, and newsroom contacts"
    >
      <SettingsForm settings={settings} onSave={update} />
    </AdminLayout>
  );
}
