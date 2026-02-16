const palette = [
  "#475569", // slate-600
  "#334155", // slate-700
  "#6b7280", // gray-500
  "#1f2937", // gray-800
  "#0f766e", // teal-700
  "#1d4ed8", // blue-700
  "#7c3aed", // violet-600
  "#9a3412", // orange-800
];

export function getCollaboratorColor(seed = "guest") {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const index = Math.abs(hash) % palette.length;
  return palette[index];
}
