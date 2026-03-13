import React, { FunctionComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../common/demo-styles.css";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { GovtechW3cVerifiableCredential } from "../../samples/govtech-w3c-template-sample";
import { CertificateTemplate } from "./w3cCertificate";
import { TranscriptTemplate } from "./w3cTranscript";

export const PrintTemplate: FunctionComponent<TemplateProps<GovtechW3cVerifiableCredential>> = ({ document }) => {
  return (
    <>
      <CertificateTemplate document={document} />
      <div style={{ pageBreakAfter: "always" }} />
      <TranscriptTemplate document={document} />
      <div style={{ pageBreakAfter: "always" }} />
      <img src="/static/images/yt.png" className="w-100" />
    </>
  );
};

