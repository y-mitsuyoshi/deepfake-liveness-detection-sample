import { AzureKeyCredential } from "@azure/core-auth";
import FaceClient from "@azure-rest/ai-vision-face";
import { defineNuxtPlugin } from 'nuxt/app';

const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
const apikey = process.env["FACE_APIKEY"] || "<apikey>";
const credential = new AzureKeyCredential(apikey);
export const client = FaceClient(endpoint, credential);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('azureFace', client)
})
