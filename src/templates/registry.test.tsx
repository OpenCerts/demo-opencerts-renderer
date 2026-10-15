import React from "react";
import { render } from "@testing-library/react";
jest.mock<Record<string, unknown>>("@trustvc/decentralized-renderer-react-components", () => ({
  ObfuscatableValue: ({ value }: { value?: string }) => value || null,
}));
import { registry, registryWithDefault } from ".";
import { customTemplateCertificate } from "./samples";

describe("registryWithDefault", () => {
  it("should resolve known template names to their own templates", () => {
    expect(registryWithDefault.TESTIMONIALS2).toBe(registry.TESTIMONIALS2);
    expect(registryWithDefault.GOVTECH_DEMO).toBe(registry.GOVTECH_DEMO);
  });

  // The renderer library looks templates up by exact name; documents using an unknown name such as
  // "CUSTOM_TEMPLATE" (opencerts-website fixtures) must still get the default certificate templates, as before.
  it.each(["CUSTOM_TEMPLATE", "SOMETHING_ELSE"])("should fall back to registry.default for %s", (name) => {
    expect(registryWithDefault[name]).toBe(registry.default);
    expect(registryWithDefault[name].map((t) => t.id)).toContain("certificate");
  });

  it("should render a CUSTOM_TEMPLATE OA v2 document with the default certificate template", () => {
    const certificate = registryWithDefault.CUSTOM_TEMPLATE.find((t) => t.id === "certificate");
    const Template = certificate!.template; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const { container } = render(<Template document={customTemplateCertificate} handleObfuscation={() => undefined} />);
    expect(container.textContent).toContain("has successfully completed the");
  });
});
