import { format } from "date-fns";
import { get } from "lodash";
import React, { FunctionComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../common/demo-styles.css";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { GovtechOpencertsTemplateCertificate } from "../../samples";
import { PrintWatermark } from "../common/print-watermark";
import mainLogo from "../common/opencerts-logo.svg";
import certificateBg from "../common/certificate-background.png";
import { CertificatePage as Page } from "../common/certificate-styles";

export const OpenAttestationCertificate: FunctionComponent<TemplateProps<GovtechOpencertsTemplateCertificate>> = ({
  document,
}) => (
  <Page certificateBg={`url('${certificateBg}')`} className="p-4">
    <PrintWatermark />
    <section className="text-center">
      <div className="spacer">
        <img src={mainLogo} className="img-fluid logo-oc" alt="OpenCerts Logo" />
      </div>
      <div className="spacer text-md">
        <i>This is to certify that</i>
      </div>
      <div className="spacer text-lg">
        <b>{document.recipient.name}</b>
      </div>
      <div className="spacer text-md">
        <i>has successfully completed the</i>
      </div>
      <div className="spacer text-lg">OpenCerts Demo</div>
    </section>
    <section>
      <div className="row align-items-center">
        <div className="col">
          <div className="text-center text-sm">
            <img
              className="img-fluid signature"
              src={get(document, "additionalData.certSignatories[0].signature")}
              alt="Signature"
            />
            <hr style={{ backgroundColor: "#333" }} />
            <div>
              <b>{get(document, "additionalData.certSignatories[0].name")}</b>
              <br />
              {get(document, "additionalData.certSignatories[0].position")},{" "}
              {get(document, "additionalData.certSignatories[0].organisation")}
            </div>
          </div>
        </div>
        <div className="col" />
        <div className="col">
          <div className="text-sm text-right">Dated {format(document.issuedOn, "DD/MM/YYYY")}</div>
        </div>
      </div>
    </section>
  </Page>
);

