import React, { FunctionComponent } from "react";
import { get } from "lodash";
import { formatDate } from "../common/functions";
import "bootstrap/dist/css/bootstrap.css";
import "../common/demo-styles.css";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { GovtechW3cVerifiableCredential } from "../../samples/govtech-w3c-template-sample";
import { PrintWatermark } from "../common/print-watermark";
import govtechLogo from "../common/govtech-logo.png";
import transcriptBg from "../common/transcript-background.png";

export const TranscriptTemplate: FunctionComponent<TemplateProps<GovtechW3cVerifiableCredential>> = ({
  document,
}) => {
  // Support both:
  // - Full W3C VC envelope (with `credentialSubject`)
  // - Plain OpenCerts-style payload (subject at top level)
  const subject = document.credentialSubject;

  const documentName = get(subject, "name");
  const documentId = get(document, "id");
  const issuanceDate = get(subject, "issuedOn");
  const admissionDate = get(subject, "admissionDate");
  const graduationDate = get(subject, "graduationDate");

  const recipientName = get(subject, "recipient.name");
  const recipientNric = get(subject, "recipient.nric");
  const recipientCourse = get(subject, "recipient.course");
  const studentId = get(subject, "additionalData.studentId");

  const transcriptData = subject.transcript || [];

  const transcriptSection = transcriptData.map((t, i) => (
    <tr key={i}>
      <td>{t.courseCode}</td>
      <td>{t.name}</td>
      <td>{t.grade}</td>
      <td>{t.courseCredit}</td>
      <td>{t.semester}</td>
    </tr>
  ));

  return (
    <>
      <PrintWatermark />
      <div className="container">
        <div
          className="p-2 container"
          style={{
            backgroundImage: `url('${transcriptBg}')`,
            backgroundRepeat: "repeat",
          }}
        >
          <div className="row root cert-title" style={{ paddingLeft: "3%" }}>
            <b>{documentName}</b>
          </div>

          <div
            className="row transcript"
            style={{
              paddingTop: "3%",
              paddingLeft: "2%",
            }}
          >
            <div className="col">
              <div className="row">
                <div className="col">NAME</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {recipientName}
                </div>
              </div>
              <div className="row">
                <div className="col">COURSE</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {recipientCourse}
                </div>
              </div>
              <div className="row">
                <div className="col">NRIC/FIN</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {recipientNric}
                </div>
              </div>
              <div className="row">
                <div className="col">STUDENT ID</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {studentId}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="col">DOCUMENT ID</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {documentId}
                </div>
              </div>
              <div className="row">
                <div className="col">DATE OF ISSUANCE</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {formatDate(issuanceDate)}
                </div>
              </div>
              <div className="row">
                <div className="col">DATE OF ADMISSION</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {formatDate(admissionDate)}
                </div>
              </div>
              <div className="row">
                <div className="col">DATE OF GRADUATION</div>
                <div className="col">
                  :&nbsp;&nbsp;
                  {formatDate(graduationDate)}
                </div>
              </div>
            </div>
          </div>

          {transcriptData.length > 0 && (
            <div className="row mb-4" style={{ paddingLeft: "3%", paddingTop: "5%" }}>
              <div className="root cert-title">
                <b>Transcript</b>
              </div>
              <table className="w-100 transcript">
                <tbody>
                  <tr>
                    <th>Course Code</th>
                    <th>Name</th>
                    <th>Grade</th>
                    <th>Units</th>
                    <th>Semester</th>
                  </tr>
                  {transcriptSection}
                </tbody>
              </table>
            </div>
          )}

          <div className="row">
            <div className="col" />
            <div
              className="col text-center"
              style={{
                paddingTop: "5%",
                paddingRight: "5%",
                width: "100%",
                height: "auto",
              }}
            >
              <img className="w-100" src={get(subject, "additionalData.certSignatories[0].signature")} />
              <hr className="m-1" />
              <div className="transcript">
                <b>{get(subject, "additionalData.certSignatories[0].name")}</b>
                <br />
                {get(subject, "additionalData.certSignatories[0].position")},{" "}
                {get(subject, "additionalData.certSignatories[0].organisation")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

