import { OpenAttestationDocument, SignedVerifiableCredential } from "@trustvc/decentralized-renderer-react-components";

export type SupportedDocument = OpenAttestationDocument | SignedVerifiableCredential;

type TranscriptRow = {
  name?: string;
  grade?: string;
  courseCredit?: string;
  courseCode?: string;
  examinationDate?: string;
  semester?: string;
};

export type CertificatePayload = {
  id?: string;
  name?: string;
  issuedOn?: string;
  admissionDate?: string;
  graduationDate?: string;
  recipient?: {
    name?: string;
    nric?: string;
    course?: string;
    studentId?: string;
  };
  transcript?: TranscriptRow[];
  additionalData?: {
    studentId?: string;
    certSignatories?: Array<{
      signature?: string;
      name?: string;
      position?: string;
      organisation?: string;
    }>;
  };
};

type W3CDocumentWithSubject = SignedVerifiableCredential & {
  credentialSubject?: CertificatePayload | CertificatePayload[];
};

const hasCredentialSubject = (document: SupportedDocument): document is W3CDocumentWithSubject => {
  return "credentialSubject" in document;
};

export const getCertificatePayload = (document: SupportedDocument): CertificatePayload => {
  if (hasCredentialSubject(document)) {
    const credentialSubject = Array.isArray(document.credentialSubject)
      ? document.credentialSubject[0]
      : document.credentialSubject;
    return credentialSubject ?? {};
  }

  return document as CertificatePayload;
};
