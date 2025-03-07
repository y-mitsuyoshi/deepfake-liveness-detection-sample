import { DefaultAzureCredential } from "@azure/identity";
import FaceClient, { isUnexpected } from "@azure-rest/ai-vision-face";
import { randomUUID } from "node:crypto";
import { Plugin } from '@nuxt/types';

const endpoint = process.env["FACE_ENDPOINT"] || "<endpoint>";
const credential = new DefaultAzureCredential();
const client = FaceClient(endpoint, credential);

const createLivenessSession = async () => {
  console.log("Create a new liveness session.");
  const createLivenessSessionResponse = await client
    .path("/detectLiveness-sessions")
    .post({
      body: {
        livenessOperationMode: "Passive",
        deviceCorrelationId: randomUUID(),
        enableSessionImage: true,
      },
    });

  if (isUnexpected(createLivenessSessionResponse)) {
    throw new Error(createLivenessSessionResponse.body.error.message);
  }
  console.log(createLivenessSessionResponse.body);

  return createLivenessSessionResponse.body;
};

const getLivenessSession = async (sessionId: string) => {
  console.log("Get liveness detection results.");
  const getLivenessSessionResponse = await client
    .path("/detectLiveness-sessions/{sessionId}", sessionId)
    .get();

  if (isUnexpected(getLivenessSessionResponse)) {
    throw new Error(getLivenessSessionResponse.body.error.message);
  }
  console.log(getLivenessSessionResponse.body);

  return getLivenessSessionResponse.body;
};

const azureFaceLivenessPlugin: Plugin = (context, inject) => {
  inject('azureFaceLiveness', {
    createLivenessSession,
    getLivenessSession,
  });
};

export default azureFaceLivenessPlugin;
