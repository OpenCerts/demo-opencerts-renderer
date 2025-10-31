import React, { FunctionComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./common/demo-styles.css";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { GovtechOpencertsTemplateCertificate } from "../samples";
import { CertificateTemplate } from "./certificate";
import { TranscriptTemplate } from "./transcript";

export const PrintTemplate: FunctionComponent<TemplateProps<GovtechOpencertsTemplateCertificate>> = ({
  document,
  handleObfuscation
}) => (
  <>
    <CertificateTemplate document={document} handleObfuscation={handleObfuscation}></CertificateTemplate>
    <div style={{ pageBreakAfter: "always" }} />
    <TranscriptTemplate document={document} handleObfuscation={handleObfuscation}></TranscriptTemplate>
    <div style={{ pageBreakAfter: "always" }} />
    <img src="/static/images/yt.png" className="w-100"></img>
  </>
);
