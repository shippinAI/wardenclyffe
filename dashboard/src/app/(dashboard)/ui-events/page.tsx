"use client";

import { RestrictedAccess } from "@/components/ui/RestrictedAccess";
import { usePermissions } from "@/contexts/PermissionsProvider";
import { UiEventsAdminPanel } from "@/modules/a2ui/admin/UiEventsAdminPanel";
import { UiEventGallery } from "@/modules/a2ui/components/gallery/UiEventGallery";

export default function UiEventsPage() {
  const { permission } = usePermissions();
  return (
    <RestrictedAccess
      page="UI Event Studio"
      hasAccess={permission?.settings?.read}
    >
      <div className="p-[var(--wc-space-3)]">
        <UiEventGallery />
      </div>
      <UiEventsAdminPanel canUpdate={!!permission?.settings?.update} />
    </RestrictedAccess>
  );
}
