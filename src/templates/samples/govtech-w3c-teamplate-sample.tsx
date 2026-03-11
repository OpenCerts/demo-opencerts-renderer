import { Document } from "@govtechsg/decentralized-renderer-react-components";

/**
 * W3C VC shape for the GovTech demo OpenCerts certificate.
 * Matches the signed W3C document used in tests:
 * - top-level VC envelope
 * - `credentialSubject` contains the OpenCerts payload
 */

export interface GovtechW3cCredentialSubject {
  id: string;
  type: ["OpenCertsCertificate"];
  name: string;
  description: string;
  issuedOn: string;
  admissionDate: string;
  graduationDate: string;
  recipient: {
    name: string;
    nric: string;
    course: string;
  };
  transcript: {
    name: string;
    grade: string;
    courseCredit: string;
    courseCode: string;
    examinationDate: string;
    semester: string;
  }[];
  additionalData: {
    merit: string;
    studentId: string;
    transcriptId: string;
    certSignatories: {
      signature: string;
      name: string;
      position: string;
      organisation: string;
    }[];
  };
}

export interface GovtechW3cVerifiableCredential extends Document {
  "@context": unknown[];
  type: ["VerifiableCredential"];
  issuer: string;
  validFrom: string;
  renderMethod: {
    id: string;
    type: string;
    templateName: string;
  }[];
  credentialSubject: GovtechW3cCredentialSubject;
}