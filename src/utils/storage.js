// ---------------------------------------------------------------------------
// Tiny localStorage wrapper. This is the ONLY place that talks to
// localStorage directly, so swapping this app to a real backend later
// just means rewriting the functions in this one file.
// ---------------------------------------------------------------------------

const NAMESPACE = 'citizen_app';

export function loadCollection(key, fallback) {
  try {
    const raw = localStorage.getItem(`${NAMESPACE}:${key}`);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Failed to load "${key}" from storage`, err);
    return fallback;
  }
}

export function saveCollection(key, value) {
  try {
    localStorage.setItem(`${NAMESPACE}:${key}`, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save "${key}" to storage`, err);
  }
}

export function clearAllData() {
  Object.keys(localStorage)
    .filter((k) => k.startsWith(`${NAMESPACE}:`))
    .forEach((k) => localStorage.removeItem(k));
}

export function uid(prefix = 'id') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
