import { CertificateTemplate } from "./certificate";
import { TranscriptTemplate } from "./transcript";
import { PrintTemplate } from "./print";
import { MediaTemplate } from "./media";

export const templates = [
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
