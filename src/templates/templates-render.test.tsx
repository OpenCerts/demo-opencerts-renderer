import React from "react";
// Emotion class hashes and Font Awesome title ids vary between runs/source, so they are stripped to compare markup only.
import { render } from "@testing-library/react";
// Only the renderer component package is stubbed (templates need ObfuscatableValue alone);
// @trustvc/trustvc is the real library, so getDocumentData's document detection is exercised for real.
jest.mock<Record<string, unknown>>("@trustvc/decentralized-renderer-react-components", () => ({
  ObfuscatableValue: ({ value }: { value?: string }) => value || null,
}));
import { registry } from ".";
import {
  customTemplateCertificate,
  customTestimonialCertificate,
  customTestimonialCertificate2,
  customCertificateOfAward,
  certificateOfAwardW3cSample,
  govtechW3cTemplateSample,
} from "./samples";
import w3cTestimonial from "../utils/__fixtures__/testimonial-w3c-vc.json";

const normalise = (html: string): string =>
  html.replace(/css-[a-z0-9]+-/g, "css-").replace(/fa-title-[A-Za-z0-9]+/g, "fa-title");

const renderAll = (key: string, document: any): string[] =>
  registry[key].map(({ template: Template }) =>
    normalise(render(<Template document={document} handleObfuscation={() => undefined} />).container.innerHTML),
  );

const oaV2Samples: [string, any][] = [
  ["GOVTECH_DEMO", customTemplateCertificate],
  ["OPENCERTS_DEMO", customTemplateCertificate],
  ["TESTIMONIALS", customTestimonialCertificate],
  ["TESTIMONIALS2", customTestimonialCertificate2],
  ["CERTIFICATE_OF_AWARD", customCertificateOfAward],
];

describe("templates", () => {
  it.each(oaV2Samples)("%s should render the OA v2 sample unchanged", (key, sample) => {
    expect(renderAll(key, sample)).toMatchSnapshot();
  });

  it("tESTIMONIALS should render the W3C VC testimonial", () => {
    const html = renderAll("TESTIMONIALS", w3cTestimonial).join("");
    expect(html).toContain("John Doe");
    expect(html).toContain("ABC Junior College");
  });

  it("tESTIMONIALS2 should render the W3C VC testimonial", () => {
    const html = renderAll("TESTIMONIALS2", w3cTestimonial).join("");
    expect(html).toContain("Mrs Jane Doe");
    expect(html).toContain("August 1, 2018");
  });

  it.each(["GOVTECH_DEMO", "OPENCERTS_DEMO"])("%s should render the W3C GovTech VC sample", (key) => {
    const html = renderAll(key, govtechW3cTemplateSample).join("");
    expect(html).toContain("Manish Singh");
    expect(html).toContain("29/05/2025");
    expect(html).not.toContain("Invalid Date");
  });

  it("cERTIFICATE_OF_AWARD should render the W3C VC award sample", () => {
    const html = renderAll("CERTIFICATE_OF_AWARD", certificateOfAwardW3cSample).join("");
    expect(html).toContain("John Doe");
    expect(html).toContain("ABC Junior College");
    expect(html).toContain("Vikram Nair");
  });

  const { validFrom: _v, ...w3cTestimonialNoDate } = w3cTestimonial; // eslint-disable-line @typescript-eslint/no-unused-vars
  const { validFrom: _a, ...awardNoDate } = certificateOfAwardW3cSample; // eslint-disable-line @typescript-eslint/no-unused-vars
  const { issuedOn: _g, ...govtechSubjectNoDate } = govtechW3cTemplateSample.credentialSubject; // eslint-disable-line @typescript-eslint/no-unused-vars
  const govtechNoDate = { ...govtechW3cTemplateSample, credentialSubject: govtechSubjectNoDate };
  it.each([
    ["GOVTECH_DEMO", govtechNoDate],
    ["OPENCERTS_DEMO", govtechNoDate],
    ["TESTIMONIALS", w3cTestimonialNoDate],
    ["TESTIMONIALS2", w3cTestimonialNoDate],
    ["CERTIFICATE_OF_AWARD", awardNoDate],
  ])("%s should render a W3C VC with no date without 'Invalid Date'", (key, doc) => {
    const html = renderAll(key, doc).join("");
    expect(html).not.toContain("Invalid Date");
    expect(html).not.toContain("NaN");
  });

  it.each(["TESTIMONIALS", "TESTIMONIALS2"])("%s should not crash on a document missing fields", (key) => {
    expect(() => renderAll(key, govtechW3cTemplateSample)).not.toThrow();
    expect(() => renderAll(key, { "@context": [], credentialSubject: {} })).not.toThrow();
  });
});
