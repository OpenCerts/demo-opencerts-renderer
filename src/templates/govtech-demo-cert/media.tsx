import React, { FunctionComponent } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { GovtechOpencertsTemplateCertificate } from "../samples";
import { MediaTemplate as W3cMediaTemplate } from "./w3c/w3cMedia";
import { GovtechW3cVerifiableCredential } from "../samples/govtech-w3c-template-sample";
import { OpenAttestationMedia } from "./openattestation/OpenAttestationMedia";
import { isW3CDocument } from "../../utils/w3c-utils";

export const MediaTemplate: FunctionComponent<TemplateProps<GovtechOpencertsTemplateCertificate>> = ({ document }) => {
  if (isW3CDocument(document as unknown as Record<string, unknown>)) {
    return <W3cMediaTemplate document={document as unknown as GovtechW3cVerifiableCredential} />;
  }

  return <OpenAttestationMedia document={document} />;
};
