import { CertificateTemplate } from "./certificate";
import { TranscriptTemplate } from "./transcript";
import { PrintTemplate } from "./print";
import { MediaTemplate } from "./media";
import { TemplateWithComponent } from "@trustvc/decentralized-renderer-react-components";
import { SupportedDocument } from "./types";

export const templates: TemplateWithComponent<SupportedDocument>[] = [
  {
    id: "certificate",
    label: "Certificate",
    template: CertificateTemplate
  },
  {
    id: "transcript",
    label: "Transcript",
    template: TranscriptTemplate
  },
  {
    id: "media",
    label: "Media",
    template: MediaTemplate
  },
  {
    id: "print",
    label: "Print",
    template: PrintTemplate
  }
];
