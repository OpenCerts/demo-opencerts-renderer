import { OpenAttestationDocument, SignedVerifiableCredential } from "@trustvc/trustvc";

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
