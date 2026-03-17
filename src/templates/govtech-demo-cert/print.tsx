import React, { FunctionComponent } from "react";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { GovtechOpencertsTemplateCertificate } from "../samples";
import { PrintTemplate as W3cPrintTemplate } from "./w3c/w3cPrint";
import { GovtechW3cVerifiableCredential } from "../samples/govtech-w3c-template-sample";
import { OpenAttestationPrint } from "./openattestation/OpenAttestationPrint";
import { isW3CDocument } from "../../utils/w3c-utils";

export const PrintTemplate: FunctionComponent<TemplateProps<GovtechOpencertsTemplateCertificate>> = ({
  document,
  handleObfuscation
}) => {
  if (isW3CDocument((document as unknown) as Record<string, unknown>)) {
    return <W3cPrintTemplate document={(document as unknown) as GovtechW3cVerifiableCredential} />;
  }

  return <OpenAttestationPrint document={document} handleObfuscation={handleObfuscation} />;
};
