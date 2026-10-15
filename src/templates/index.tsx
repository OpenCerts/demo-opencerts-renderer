import { templates as govtechDemoTemplates } from "./govtech-demo-cert";
import { templates as imdaDemoTemplates } from "./imda-demo-cert";
import { templates as testimonialsTemplates, templates2 as testimonialsTemplates2 } from "./testimonials";
import { templates as certificateOfAwardTemplates } from "./certificate-of-award";
import { TemplateRegistry } from "@trustvc/decentralized-renderer-react-components";

export const registry: TemplateRegistry<any> = {
  default: govtechDemoTemplates,
  GOVTECH_DEMO: govtechDemoTemplates,
  TESTIMONIALS: testimonialsTemplates,
  TESTIMONIALS2: testimonialsTemplates2,
  CERTIFICATE_OF_AWARD: certificateOfAwardTemplates,
  OPENCERTS_DEMO: imdaDemoTemplates,
};

// @govtechsg/decentralized-renderer-react-components 2.0.3 (used on `imda`) rendered `registry.default` for any template
// name that is not a registry key. @trustvc/decentralized-renderer-react-components only does `registry[name] || a
// built-in JSON view` and never reads `registry.default`, so unknown names (e.g. "CUSTOM_TEMPLATE" in OpenCerts
// documents) show raw JSON. Resolve unknown string names to `registry.default` to keep the old behaviour.
export const registryWithDefault: TemplateRegistry<any> = new Proxy(registry, {
  get: (target, name) => (typeof name === "string" && !(name in target) ? target.default : target[name as string]),
});
