import React, { FunctionComponent } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { GovtechOpencertsTemplateCertificate } from "../samples";
import { TranscriptTemplate as W3cTranscriptTemplate } from "./w3c/w3cTranscript";
import { GovtechW3cVerifiableCredential } from "../samples/govtech-w3c-template-sample";
import { OpenAttestationTranscript } from "./openattestation/OpenAttestationTranscript";
import { isW3CDocument } from "../../utils/w3c-utils";

export const TranscriptTemplate: FunctionComponent<TemplateProps<GovtechOpencertsTemplateCertificate>> = ({
  document,
  handleObfuscation,
}) => {
  if (isW3CDocument(document as unknown as Record<string, unknown>)) {
    return (
      <W3cTranscriptTemplate
        document={document as unknown as GovtechW3cVerifiableCredential}
      />
    );
  }

  return <OpenAttestationTranscript document={document} handleObfuscation={handleObfuscation} />;
};
