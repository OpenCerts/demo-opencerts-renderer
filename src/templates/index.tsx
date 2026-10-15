import { templates as govtechDemoTemplates } from "./govtech-demo-cert";
import { templates as imdaDemoTemplates } from "./imda-demo-cert";
import { templates as testimonialsTemplates, templates2 as testimonialsTemplates2 } from "./testimonials";
import { templates as certificateOfAwardTemplates } from "./certificate-of-award";
import { TemplateRegistry } from "@trustvc/decentralized-renderer-react-components";

export const registry: TemplateRegistry<any> = {
  // @trustvc/decentralized-renderer-react-components (unlike the previous @govtechsg 2.0.3 library) does not fall
  // back to `registry.default` for an unknown template name; it shows a raw JSON dump instead. OpenCerts documents
  // (and the opencerts-website e2e fixtures) use "CUSTOM_TEMPLATE", so map it explicitly.
  default: govtechDemoTemplates,
  CUSTOM_TEMPLATE: govtechDemoTemplates,
  GOVTECH_DEMO: govtechDemoTemplates,
  TESTIMONIALS: testimonialsTemplates,
  TESTIMONIALS2: testimonialsTemplates2,
  CERTIFICATE_OF_AWARD: certificateOfAwardTemplates,
  OPENCERTS_DEMO: imdaDemoTemplates,
};
