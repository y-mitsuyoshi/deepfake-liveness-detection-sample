import { DefaultAzureCredential } from "@azure/identity";
import FaceClient from "@azure-rest/ai-vision-face";
import { Plugin } from '@nuxt/types';

const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
const apikey = process.env["FACE_APIKEY"] || "<apikey>";
const credential = new AzureKeyCredential(apikey);
const client = FaceClient(endpoint, credential);

const azureFacePlugin: Plugin = (context, inject) => {
  inject('azureFace', client);
};

export default azureFacePlugin;
