import React, { FunctionComponent } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { GovtechOpencertsTemplateCertificate } from "../samples";
import { CertificateTemplate as W3cCertificateTemplate } from "./w3c/w3cCertificate";
import { GovtechW3cVerifiableCredential } from "../samples/govtech-w3c-template-sample";
import { isW3CDocument } from "../../utils/w3c-utils";
import { OpenAttestationCertificate } from "./openattestation/OpenAttestationCertificate";

export const CertificateTemplate: FunctionComponent<TemplateProps<GovtechOpencertsTemplateCertificate>> = ({
  document,
  handleObfuscation,
}) => {
  if (isW3CDocument(document as unknown as Record<string, unknown>)) {
    return (
      <W3cCertificateTemplate
        document={document as unknown as GovtechW3cVerifiableCredential}
      />
    );
  }

  return <OpenAttestationCertificate document={document} handleObfuscation={handleObfuscation} />;
};
