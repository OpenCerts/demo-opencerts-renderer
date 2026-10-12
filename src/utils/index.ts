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
 * - W3C VC (signed or raw) / OA v3: `credentialSubject` (first entry if it is an array).
 *   Templates here also read `issuedOn`, which W3C VCs carry at the top level as
 *   `validFrom` (VC 2.0) or `issuanceDate` (VC 1.1), so it is mapped onto the data
 *   when the subject does not already define `issuedOn`.
 * - Wrapped OA v2: unwrapped data via `getDataV2`.
 * - Anything else (raw OA v2, as passed by the renderer today): the document itself.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDocumentData = (document: SupportedDocument): any => {
  if (
    isWrappedV3Document(document) ||
    isRawV3Document(document) ||
    vc.isSignedDocument(document) ||
    vc.isRawDocument(document)
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
