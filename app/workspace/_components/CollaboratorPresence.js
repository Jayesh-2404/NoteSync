import React from "react";
import { Users } from "lucide-react";

function InitialAvatar({ name, color, imageUrl }) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className="w-7 h-7 rounded-full object-cover border border-border"
      />
    );
  }

  const initial = (name || "G").trim().charAt(0).toUpperCase();

  return (
    <div
      className="w-7 h-7 rounded-full text-white text-xs font-semibold flex items-center justify-center border border-border"
      style={{ backgroundColor: color }}
      title={name}
    >
      {initial}
    </div>
  );
}

const STATUS_META = {
  online: {
    label: "live",
    dot: "bg-emerald-500",
    title: "Live collaboration is active",
  },
  waiting: {
    label: "waiting",
    dot: "bg-amber-500",
    title: "Connected to the signaling server, waiting for collaborators",
  },
  local: {
    label: "local only",
    dot: "bg-sky-500",
    title:
      "Only tabs in this browser can sync. Set NEXT_PUBLIC_YJS_SIGNALING to enable cross-device collaboration.",
  },
  connecting: {
    label: "connecting",
    dot: "bg-gray-400",
    title: "Connecting to collaborators",
  },
  offline: {
    label: "offline",
    dot: "bg-gray-400",
    title: "Not connected to a signaling server",
  },
};

function CollaboratorPresence({ collaborators = [], connectionStatus = "offline" }) {
  const status = STATUS_META[connectionStatus] || STATUS_META.offline;
  const memberCount = collaborators.length;

  return (
    <div className="flex items-center gap-3 rounded-md border px-3 py-1.5 bg-background">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="h-4 w-4" />
        <span>{memberCount}</span>
      </div>

      <div className="flex -space-x-2">
        {collaborators.slice(0, 4).map((collaborator) => (
          <InitialAvatar
            key={`${collaborator.email || collaborator.name}-${collaborator.clientId}`}
            name={collaborator.name}
            color={collaborator.color}
            imageUrl={collaborator.avatar}
          />
        ))}
        {memberCount > 4 ? (
          <div className="w-7 h-7 rounded-full border border-border bg-muted text-xs font-medium flex items-center justify-center">
            +{memberCount - 4}
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-1.5 whitespace-nowrap text-xs" title={status.title}>
        <span className={`w-2 h-2 rounded-full ${status.dot}`} />
        <span className="text-muted-foreground capitalize">{status.label}</span>
      </div>
    </div>
  );
}

export default CollaboratorPresence;
