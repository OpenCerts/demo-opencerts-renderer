// Uses the real @trustvc/trustvc (2.11.1) type guards and getDataV2, so these tests fail if the
// library's document detection differs from what getDocumentData expects.
import { wrapOADocumentV2, vc } from "@trustvc/trustvc";
import { getDocumentData } from ".";
import { customTestimonialCertificate } from "../templates/samples/testimonial-sample";
import { certificateOfAwardW3cSample } from "../templates/samples/certificate-of-award-w3c-sample";
import w3cTestimonial from "./__fixtures__/testimonial-w3c-vc.json";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { proof, ...rawW3cTestimonial } = w3cTestimonial;

describe("getDocumentData", () => {
  it("should return a raw OA v2 document as is", () => {
    expect(getDocumentData(customTestimonialCertificate as any)).toBe(customTestimonialCertificate);
  });

  it("should return credentialSubject (with issuedOn from validFrom) for a signed W3C v2 VC", () => {
    expect(vc.isSignedDocument(w3cTestimonial)).toBe(true);
    const data = getDocumentData(w3cTestimonial as any);
    expect(data).toStrictEqual({ ...w3cTestimonial.credentialSubject, issuedOn: w3cTestimonial.validFrom });
    expect(data.recipient.name).toBe("John Doe");
    expect(data.referee.name).toBe("Mrs Jane Doe");
  });

  it("should return credentialSubject for a raw W3C VC that has an id (rejected by vc.isRawDocument)", () => {
    expect(vc.isSignedDocument(rawW3cTestimonial)).toBe(false);
    expect(vc.isRawDocument(rawW3cTestimonial)).toBe(false);
    expect(getDocumentData(rawW3cTestimonial as any)).toStrictEqual({
      ...w3cTestimonial.credentialSubject,
      issuedOn: w3cTestimonial.validFrom,
    });
    expect(getDocumentData(certificateOfAwardW3cSample as any).award.instituteName).toBe("ABC Junior College");
  });

  it("should unwrap a wrapped OA v2 document with the real getDataV2", async () => {
    const wrapped = await wrapOADocumentV2(customTestimonialCertificate as any);
    expect((wrapped as any).data.name).not.toBe(customTestimonialCertificate.name); // salted
    expect(getDocumentData(wrapped as any)).toStrictEqual(customTestimonialCertificate);
  });

  it("should map issuanceDate for a VC 1.1 and use the first subject of an array", () => {
    const data = getDocumentData({
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      id: "urn:uuid:1",
      type: ["VerifiableCredential"],
      issuer: "did:web:example.com",
      issuanceDate: "2020-01-01T00:00:00Z",
      credentialSubject: [{ recipient: { name: "A" } }, { recipient: { name: "B" } }],
    } as any);
    expect(data).toStrictEqual({ recipient: { name: "A" }, issuedOn: "2020-01-01T00:00:00Z" });
  });

  it("should keep credentialSubject.issuedOn over validFrom", () => {
    const doc = { ...rawW3cTestimonial, credentialSubject: { ...w3cTestimonial.credentialSubject, issuedOn: "X" } };
    expect(getDocumentData(doc as any).issuedOn).toBe("X");
  });

  it("should leave issuedOn undefined when the VC has no date", () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { validFrom, ...noDate } = rawW3cTestimonial;
    const data = getDocumentData(noDate as any);
    expect(data).toStrictEqual(w3cTestimonial.credentialSubject);
    expect("issuedOn" in data).toBe(false);
  });
});
