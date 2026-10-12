import React from "react";
// Emotion class hashes and Font Awesome title ids vary between runs/source, so they are stripped to compare markup only.
import { render } from "@testing-library/react";
// The real packages pull in browser-only deps (fetch/TextEncoder) at import time; templates only need these pieces.
jest.mock<Record<string, unknown>>("@trustvc/decentralized-renderer-react-components", () => ({
  ObfuscatableValue: ({ value }: { value?: string }) => value || null,
}));
jest.mock<Record<string, unknown>>("@trustvc/trustvc", () => ({
  vc: {
    isSignedDocument: (d: any) => !!(d && d.credentialSubject && d.proof),
    isRawDocument: (d: any) => !!(d && d.credentialSubject),
  },
  isWrappedV3Document: () => false,
  isRawV3Document: () => false,
  isWrappedV2Document: () => false,
  getDataV2: (d: any) => d,
}));
import { registry } from ".";
import {
  customTemplateCertificate,
  customTestimonialCertificate,
  customTestimonialCertificate2,
  customCertificateOfAward,
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

  it.each(["GOVTECH_DEMO", "OPENCERTS_DEMO", "CERTIFICATE_OF_AWARD"])(
    "%s should render a W3C VC without errors",
    (key) => {
      const vc = {
        ...w3cTestimonial,
        credentialSubject: { ...w3cTestimonial.credentialSubject, recipient: { name: "John Doe" } },
      };
      expect(() => renderAll(key, vc)).not.toThrow();
    },
  );
});
