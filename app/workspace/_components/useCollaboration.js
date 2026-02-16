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
      const usersByIdentity = new Map();
      awareness.getStates().forEach((state, clientId) => {
        if (!state?.user) return;
        const identityKey = state.user.email || `client-${clientId}`;
        if (usersByIdentity.has(identityKey)) return;
        usersByIdentity.set(identityKey, {
          clientId,
          ...state.user,
        });
      });
      setCollaborators(Array.from(usersByIdentity.values()));
    };

    const handleStatus = ({ connected }) => {
      signalingConnectedRef.current = Boolean(connected);
      updateConnectionStatus();
    };

    const handlePeers = ({ webrtcPeers = [], bcPeers = [] }) => {
      const totalPeers = new Set([...webrtcPeers, ...bcPeers]).size;
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
