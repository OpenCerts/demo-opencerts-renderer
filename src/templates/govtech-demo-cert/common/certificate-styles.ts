import styled from "@emotion/styled";

export const CertificatePage = styled("div")<{ certificateBg: string }>`
  max-width: 297mm;
  margin: 0 auto;

  position: relative;
  background-image: ${props => props.certificateBg};
  background-position: center;
  background-size: cover;
  border: 10px solid #324353;

  .logo-oc {
    width: 320px;
    @media (min-width: 1024px) {
      width: 600px;
    }
  }

  .logo-gt {
    width: 200px;
    @media (min-width: 1024px) {
      width: 300px;
    }
  }

  .signature {
    width: 160px;
    @media (min-width: 1024px) {
      width: 230px;
    }
  }

  .text-sm {
    font-size: 12px;
    @media (min-width: 1024px) {
      font-size: 21px;
    }
  }

  .text-md {
    font-size: 16px;
    @media (min-width: 1024px) {
      font-size: 26px;
    }
  }

  .text-lg {
    font-size: 24px;
    @media (min-width: 1024px) {
      font-size: 34px;
    }
  }

  .spacer {
    margin: 24px;

    @media (min-width: 1024px) {
      margin: 48px;
    }
  }

  footer {
    max-width: 960px;
    margin: 0 auto;
    padding: 64px 24px;

    @media (min-width: 1024px) {
      padding: 96px;
    }
  }

  @media print {
    .logo-oc {
      width: 320px;
    }

    .logo-gt {
      width: 200px;
    }

    .signature {
      width: 160px;
    }

    .text-sm {
      font-size: 12px;
    }

    .text-md {
      font-size: 16px;
    }

    .text-lg {
      font-size: 24px;
    }

    .spacer {
      margin: 24px;
    }

    footer {
      padding: 64px 24px;
    }
  }
`;
