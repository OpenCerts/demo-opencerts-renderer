import React, { FunctionComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./common/demo-styles.css";
import { TemplateProps } from "@trustvc/decentralized-renderer-react-components";
import { CertificateTemplate } from "./certificate";
import { TranscriptTemplate } from "./transcript";
import { SupportedDocument } from "./types";

export const PrintTemplate: FunctionComponent<TemplateProps<SupportedDocument>> = ({ document, handleObfuscation }) => (
  <>
    <CertificateTemplate document={document} handleObfuscation={handleObfuscation} />
    <div style={{ pageBreakAfter: "always" }} />
    <TranscriptTemplate document={document} handleObfuscation={handleObfuscation} />
    <div style={{ pageBreakAfter: "always" }} />
    <img src="/static/images/yt.png" className="w-100" />
  </>
);
