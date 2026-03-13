export const isW3CDocument = (document: Record<string, unknown>): boolean => {
  if (!document || !document["@context"]) return false;

  const type = document.type;
  const hasVerifiableCredential = Array.isArray(type)
    ? type.includes("VerifiableCredential")
    : type === "VerifiableCredential";

  if (!hasVerifiableCredential) return false;

  // Exclude OpenAttestation documents
  if ((document as { openAttestationMetadata?: unknown }).openAttestationMetadata) return false;

  const ctx = document["@context"];
  if (
    (Array.isArray(ctx) && ctx.some((c) => c && String(c).includes("openattestation"))) ||
    (typeof ctx === "string" && ctx.includes("openattestation"))
  ) {
    return false;
  }

  return true;
};
