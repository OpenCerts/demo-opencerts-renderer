import React, { FunctionComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../common/demo-styles.css";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { GovtechOpencertsTemplateCertificate } from "../../samples";
import { OpenAttestationCertificate } from "./OpenAttestationCertificate";
import { OpenAttestationTranscript } from "./OpenAttestationTranscript";

export const OpenAttestationPrint: FunctionComponent<TemplateProps<GovtechOpencertsTemplateCertificate>> = ({
  document,
  handleObfuscation,
}) => (
  <>
    <OpenAttestationCertificate document={document} handleObfuscation={handleObfuscation} />
    <div style={{ pageBreakAfter: "always" }} />
    <OpenAttestationTranscript document={document} handleObfuscation={handleObfuscation} />
    <div style={{ pageBreakAfter: "always" }} />
    <img src="/static/images/yt.png" className="w-100" />
  </>
);

