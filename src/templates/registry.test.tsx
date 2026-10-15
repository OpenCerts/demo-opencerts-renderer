import React from "react";
import { render } from "@testing-library/react";
jest.mock<Record<string, unknown>>("@trustvc/decentralized-renderer-react-components", () => ({
  ObfuscatableValue: ({ value }: { value?: string }) => value || null,
}));
import { registry } from ".";
import { customTemplateCertificate } from "./samples";

describe("registry", () => {
  // The renderer library only looks templates up by exact name (no `registry.default` fallback), and
  // opencerts-website documents use $template.name "CUSTOM_TEMPLATE".
  it("should have the OpenCerts demo certificate and transcript tabs for CUSTOM_TEMPLATE", () => {
    expect(registry.CUSTOM_TEMPLATE).toBe(registry.GOVTECH_DEMO);
    expect(registry.CUSTOM_TEMPLATE.map((t) => t.id)).toContain("certificate");
  });

  it("should render a CUSTOM_TEMPLATE OA v2 document with the certificate template", () => {
    const certificate = registry.CUSTOM_TEMPLATE.find((t) => t.id === "certificate");
    const Template = certificate!.template; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const { container } = render(<Template document={customTemplateCertificate} handleObfuscation={() => undefined} />);
    expect(container.textContent).toContain("has successfully completed the");
  });
});
