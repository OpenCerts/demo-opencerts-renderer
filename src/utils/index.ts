import {
  OpenAttestationDocument,
  RawVerifiableCredential,
  SignedVerifiableCredential,
  getDataV2,
  isRawV3Document,
  isWrappedV2Document,
  isWrappedV3Document,
  vc,
} from "@trustvc/trustvc";

export type SupportedDocument = OpenAttestationDocument | SignedVerifiableCredential | RawVerifiableCredential;

/**
 * Returns the data a template should render, based on the document type.
 * Modelled on TradeTrust generic-templates `getDocumentData`:
 * https://github.com/TradeTrust/generic-templates/blob/master/src/utils/index.ts
 *
 * - W3C VC (signed or raw) / OA v3: `credentialSubject` (first entry if it is an array,
 *   `{}` if absent). A document with both `@context` and `credentialSubject` is treated as a
 *   W3C VC even when trustvc's `vc.isRawDocument` rejects it (it returns false for a raw VC
 *   that has an `id`, for example).
 *
 *   `issuedOn` mapping: templates read `issuedOn`, which W3C VCs do not carry in the subject.
 *   The returned data gets `issuedOn` set to, in order of precedence:
 *     1. `credentialSubject.issuedOn` (left untouched if present),
 *     2. `validFrom` (VC 2.0),
 *     3. `issuanceDate` (VC 1.1).
 *   If none exist, `issuedOn` is left undefined and templates render no date.
 * - Wrapped OA v2: unwrapped data via `getDataV2`.
 * - Anything else (raw OA v2, as passed by the renderer today): the document itself.
 */
const isW3cLike = (document: unknown): boolean =>
  !!document && typeof document === "object" && "@context" in document && "credentialSubject" in document;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDocumentData = (document: SupportedDocument): any => {
  if (
    isWrappedV3Document(document) ||
    isRawV3Document(document) ||
    vc.isSignedDocument(document) ||
    vc.isRawDocument(document) ||
    isW3cLike(document)
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { credentialSubject, validFrom, issuanceDate } = document as any;
    const subject = (Array.isArray(credentialSubject) ? credentialSubject[0] : credentialSubject) ?? {};
    const issuedOn = subject.issuedOn ?? validFrom ?? issuanceDate;
    return issuedOn === undefined ? subject : { ...subject, issuedOn };
  } else if (isWrappedV2Document(document)) {
    return getDataV2(document);
  } else return document;
};
