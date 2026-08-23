import { ArrowRight02Icon } from "hugeicons-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-ink-900 text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-center gap-2">
        <span className="font-semibold text-accent-500">New:</span>
        <span>Train your team inside 7shifts. Free until August 30.</span>
        <ArrowRight02Icon size={16} strokeWidth={2} />
      </div>
    </div>
  );
}
