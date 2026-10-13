import { customCertificateOfAward } from "./certificate-of-award-sample";

// Raw (unsigned) W3C VC 2.0 carrying the certificate-of-award payload in credentialSubject.
// It has an `id`, so trustvc's vc.isRawDocument rejects it; getDocumentData must still read it.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { $template, issuers, issuedOn, ...subject } = customCertificateOfAward;

export const certificateOfAwardW3cSample = {
  "@context": ["https://www.w3.org/ns/credentials/v2", "https://trustvc.io/context/render-method-context-v2.json"],
  id: "urn:uuid:0192b1c4-5a6e-7c1d-9f00-certificateaward",
  type: ["VerifiableCredential"],
  issuer: { id: "did:web:isaackps.com", name: "Ministry of Education" },
  validFrom: issuedOn,
  renderMethod: [
    { id: "https://demo-renderer.opencerts.io", type: "EMBEDDED_RENDERER", templateName: "CERTIFICATE_OF_AWARD" },
  ],
  credentialSubject: { ...subject, type: ["CertificateOfAward"] },
};
