/**
 * The inviter a `/v/<handle>` visit stashes for the dashboard's vouch-back nudge
 * (`InviteNudge`). Per tab (sessionStorage), and always normalized so it compares reliably
 * with the signed-in profile's handle.
 */
const KEY = 'alvinmunk.ref';

/** The signed-in profile's handle, normalized for comparison with a stored ref. */
export function isOwnRef(ref: string, profileHandle: string | null | undefined): boolean {
  if (!profileHandle) return false;
  return normalizeRefHandle(ref) === normalizeRefHandle(profileHandle);
}

/** A handle as the ref stores and compares it: trimmed, no leading `@`, lowercase. */
export function normalizeRefHandle(handle: string): string {
  return handle.trim().replace(/^@/, '').toLowerCase();
}

/** Remember `handle` as this tab's inviter. Call only once it resolves to an address. */
export function saveInviteRef(handle: string): void {
  const ref = normalizeRefHandle(handle);
  if (!ref) return;
  try {
    sessionStorage.setItem(KEY, ref);
  } catch {
    /* storage unavailable */
  }
}

/** This tab's inviter, normalized; null when none is stored or storage is unavailable. */
export function loadInviteRef(): string | null {
  try {
    return normalizeRefHandle(sessionStorage.getItem(KEY) ?? '') || null;
  } catch {
    return null;
  }
}

export function clearInviteRef(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
}
