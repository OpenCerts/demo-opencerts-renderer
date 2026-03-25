import React, { FunctionComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { TemplateProps } from "@trustvc/decentralized-renderer-react-components";
import { TestimonialCertificate } from "../samples";
import { css } from "@emotion/react";
import { Page, PageContainer, pageHeight, pageWidth } from "../../components/page";
import banner from "./testimonial-2-banner.jpg";

const headerHeight = "5cm";
const footerHeight = "2cm";
const contentHeight = `calc(${pageHeight} - ${headerHeight} - ${footerHeight})`;

export const TestimonialTemplate2: FunctionComponent<TemplateProps<any>> = ({ document }) => {
  const typedDocument = document as TestimonialCertificate;
  return (
    <PageContainer>
      <Page>
        <div
          css={css`
            background: url(${banner});
            height: ${headerHeight};
            background-size: ${pageWidth} ${headerHeight};
          `}
        />
        <div
          css={css`
            padding: 1cm 2cm;
            height: ${contentHeight};
          `}
        >
          <p
            css={css`
              padding-bottom: 1cm;
              padding-top: 1cm;
            `}
          >
            {/* this is not correct, because of TZ, but it's a demo :)*/}
            {new Date(typedDocument.issuedOn).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="text-justify" dangerouslySetInnerHTML={{ __html: typedDocument.content }} />
          <div>
            <div>
              <img
                css={css`
                  width: 100px;
                `}
                src={typedDocument.referee.signature}
              />
            </div>
            <div>{typedDocument.referee.name}</div>
            <div>{typedDocument.referee.designation}</div>
            <div>Mobile: {typedDocument.referee.mobile}</div>
            <div>Email: {typedDocument.referee.email}</div>
          </div>
        </div>
        <div
          css={css`
            height: ${footerHeight};
          `}
        >
          <div
            css={css`
              background-color: #0072c6;
              color: white;
              height: 1cm;
              margin-left: 1cm;
              margin-right: 1cm;
              padding-left: 1cm;
              padding-right: 1cm;
              display: flex;
              align-items: center;
            `}
          >
            {typedDocument.referee.address}
          </div>
        </div>
      </Page>
    </PageContainer>
  );
};
