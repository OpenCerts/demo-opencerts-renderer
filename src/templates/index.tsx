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

/**
 * The previous @govtechsg/decentralized-renderer-react-components (2.0.3) rendered `registry.default` for any template
 * name that is not a registry key. @trustvc/decentralized-renderer-react-components looks templates up with
 * `templateRegistry[name] || [defaultTemplate]` and ignores `registry.default`, so unknown names (for example the
 * "CUSTOM_TEMPLATE" used by OpenCerts documents) end up as a raw JSON dump. This wrapper restores the old behaviour:
 * any unknown template name resolves to `registry.default`.
 */
export const withDefaultFallback = (templates: TemplateRegistry<any>): TemplateRegistry<any> =>
  new Proxy(templates, {
    get: (target, name, receiver) =>
      typeof name === "string" && !(name in target) ? target.default : Reflect.get(target, name, receiver),
  });

export const registryWithDefault = withDefaultFallback(registry);
