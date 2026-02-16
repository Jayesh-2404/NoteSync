"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { getCollaboratorColor } from "@/lib/collaborationColors";

const SIGNALING_SERVERS = [
  "wss://y-webrtc-eu.fly.dev",
  "wss://y-webrtc-us.fly.dev",
  "wss://signaling.yjs.dev",
];

export function useCollaboration(fileId, user) {
  const [provider, setProvider] = useState(null);
  const [document, setDocument] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [collaborators, setCollaborators] = useState([]);
  const [peerCount, setPeerCount] = useState(0);

  const signalingConnectedRef = useRef(false);
  const peerCountRef = useRef(0);
  const sessionIdRef = useRef(
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `session-${Math.random().toString(36).slice(2, 10)}`
  );

  const userEmail = user?.primaryEmailAddress?.emailAddress || "guest@notesync.local";
  const userName = user?.fullName || user?.firstName || "Guest";
  const userAvatar = user?.imageUrl || null;

  const localUser = useMemo(() => {
    const email = userEmail;
    return {
      email,
      name: userName,
      color: getCollaboratorColor(email),
      avatar: userAvatar,
      sessionId: sessionIdRef.current,
    };
  }, [userAvatar, userEmail, userName]);

  const updateConnectionStatus = () => {
    if (!signalingConnectedRef.current) {
      setConnectionStatus("offline");
      return;
    }

    if (peerCountRef.current > 0) {
      setConnectionStatus("online");
      return;
    }

    setConnectionStatus("waiting");
  };

  useEffect(() => {
    if (!fileId) return;

    const roomName = `notesync-room-${fileId}`;
    const ydoc = new Y.Doc();
    const webrtcProvider = new WebrtcProvider(roomName, ydoc, {
      signaling: SIGNALING_SERVERS,
      maxConns: 40,
      filterBcConns: false,
    });

    setProvider(webrtcProvider);
    setDocument(ydoc);

    const awareness = webrtcProvider.awareness;
    awareness.setLocalStateField("user", localUser);

    const syncAwareness = () => {
      const users = [];
      awareness.getStates().forEach((state, clientId) => {
        const sessionUser = state?.user;
        if (!sessionUser) return;

        const email = sessionUser.email || `guest-${clientId}`;
        users.push({
          clientId,
          sessionId: sessionUser.sessionId || `client-${clientId}`,
          email,
          name: sessionUser.name || "Guest",
          color: sessionUser.color || getCollaboratorColor(email),
          avatar: sessionUser.avatar || null,
          isLocal: clientId === awareness.clientID,
        });
      });

      users.sort((a, b) => Number(b.isLocal) - Number(a.isLocal));
      setCollaborators(users);
    };

    const handleStatus = ({ connected }) => {
      signalingConnectedRef.current = Boolean(connected);
      updateConnectionStatus();
    };

    const handlePeers = ({ webrtcPeers = [], bcPeers = [] }) => {
      const peersFromProvider = new Set([...webrtcPeers, ...bcPeers]).size;
      const peersFromAwareness = Math.max(awareness.getStates().size - 1, 0);
      const totalPeers = Math.max(peersFromProvider, peersFromAwareness);
      peerCountRef.current = totalPeers;
      setPeerCount(totalPeers);
      updateConnectionStatus();
    };

    syncAwareness();
    handleStatus({ connected: webrtcProvider.connected });
    awareness.on("change", syncAwareness);
    webrtcProvider.on("status", handleStatus);
    webrtcProvider.on("peers", handlePeers);

    return () => {
      awareness.off("change", syncAwareness);
      webrtcProvider.off("status", handleStatus);
      webrtcProvider.off("peers", handlePeers);
      webrtcProvider.destroy();
      ydoc.destroy();
      setProvider(null);
      setDocument(null);
      setCollaborators([]);
      setPeerCount(0);
      peerCountRef.current = 0;
      signalingConnectedRef.current = false;
      setConnectionStatus("offline");
    };
  }, [fileId, localUser]);

  return {
    provider,
    ydoc: document,
    connectionStatus,
    collaborators,
    peerCount,
    localUser,
  };
}
