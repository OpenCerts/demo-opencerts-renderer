import React from "react";
import ReactDOM from "react-dom/client";
import { FramedDocumentRenderer } from "@trustvc/decentralized-renderer-react-components";
import { registry } from "./templates";
import "./index.css";

const container = document.getElementById("root");
if (!container) throw new Error("Root container #root not found");

ReactDOM.createRoot(container).render(<FramedDocumentRenderer templateRegistry={registry} />);
