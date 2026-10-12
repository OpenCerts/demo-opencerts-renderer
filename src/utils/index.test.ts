// The real @trustvc/trustvc pulls in browser-only deps (fetch/TextEncoder) at import time under jest,
// so its type guards are replaced with minimal equivalents.
jest.mock<Record<string, unknown>>("@trustvc/trustvc", () => ({
  vc: {
    isSignedDocument: (d: any) => !!(d && d.credentialSubject && d.proof),
    isRawDocument: (d: any) => !!(d && d.credentialSubject),
  },
  isWrappedV3Document: () => false,
  isRawV3Document: () => false,
  isWrappedV2Document: (d: any) => !!(d && d.signature && d.data),
  getDataV2: (d: any) => ({ unwrapped: d.data }),
}));
import { getDocumentData } from ".";
import { customTestimonialCertificate } from "../templates/samples/testimonial-sample";
import w3cTestimonial from "./__fixtures__/testimonial-w3c-vc.json";

describe("getDocumentData", () => {
  it("should return a raw OA v2 document as is", () => {
    expect(getDocumentData(customTestimonialCertificate as any)).toBe(customTestimonialCertificate);
  });

  it("should return credentialSubject (with issuedOn from validFrom) for a W3C v2 VC", () => {
    const data = getDocumentData(w3cTestimonial as any);
    expect(data).toStrictEqual({ ...w3cTestimonial.credentialSubject, issuedOn: w3cTestimonial.validFrom });
    expect(data.recipient.name).toBe("John Doe");
    expect(data.referee.name).toBe("Mrs Jane Doe");
  });

  it("should unwrap a wrapped OA v2 document with getDataV2", () => {
    expect(getDocumentData({ data: { a: 1 }, signature: {} } as any)).toStrictEqual({ unwrapped: { a: 1 } });
  });

  it("should map issuanceDate for a VC 1.1 and use the first subject of an array", () => {
    const data = getDocumentData({
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      type: ["VerifiableCredential"],
      issuer: "did:web:example.com",
      issuanceDate: "2020-01-01T00:00:00Z",
      credentialSubject: [{ recipient: { name: "A" } }, { recipient: { name: "B" } }],
    } as any);
    expect(data).toStrictEqual({ recipient: { name: "A" }, issuedOn: "2020-01-01T00:00:00Z" });
  });
});
