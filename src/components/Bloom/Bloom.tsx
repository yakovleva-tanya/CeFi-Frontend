import React from "react";
import {
  RequestElement,
  RequestData,
  ButtonOptions,
  Action,
} from "@bloomprotocol/share-kit-react";

const requestData: RequestData = {
  action: Action.attestation,
  token: "aa57c0fe-57db-455a-8536-56372a22264f",
  org_name: "Teller Finance",
  url: "https://teller.finance",
  org_logo_url:
    "https://uploads-ssl.webflow.com/5f445def1b41123ecc7d0254/5f4463b3a3bf59e8528e3413_img-teller-logo-black-v1.0.svg",
  org_usage_policy_url:
    "https://app.termly.io/document/terms-of-use-for-website/21b27900-06c4-4b4d-bc95-73642b34e437",
  org_privacy_policy_url:
    "https://app.termly.io/document/privacy-policy/398c0f5b-02f5-4078-8dd7-72c1cd25c56a",
  types: ["email", "id-document"],
};

const buttonOptions: ButtonOptions = {
  callbackUrl: "",
};

const Bloom = () => (
  <RequestElement
    requestData={requestData}
    buttonOptions={buttonOptions}
    qrOptions={{
      size: 256,
      hideLogo: false,
      fgColor: "#008b88",
    }}
  />
);

export default Bloom;
