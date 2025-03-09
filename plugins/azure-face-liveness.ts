import { isUnexpected } from "@azure-rest/ai-vision-face";
import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { defineNuxtPlugin } from 'nuxt/app';
import { client } from '~/plugins/azure-face';

export default defineNuxtPlugin((nuxtApp) => {
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
    
    const { sessionId } = createLivenessSessionResponse.body;
    
    console.log("Get liveness detection results.");
    const getLivenessSessionResponse = await client
      .path("/detectLiveness-sessions/{sessionId}", sessionId)
      .get();
    
    if (isUnexpected(getLivenessSessionResponse)) {
      throw new Error(getLivenessSessionResponse.body.error.message);
    }
    console.log(getLivenessSessionResponse.body);
  };

  const createLivenessWithVerifySession = async () => {
    console.log("Create a new liveness with verify session with verify image.");
    const createLivenessSessionResponse = await client
      .path("/detectLivenessWithVerify-sessions")
      .post({
        contentType: "multipart/form-data",
        body: [
          {
            name: "verifyImage",
            body: readFileSync("path/to/verify/image"),
            filename: "verifyImage.jpg",
          },
          {
            name: "livenessOperationMode",
            body: "Passive",
          },
          {
            name: "deviceCorrelationId",
            body: randomUUID(),
          },
          {
            name: "enableSessionImage",
            body: true,
          },
        ],
      });
    
    if (isUnexpected(createLivenessSessionResponse)) {
      throw new Error(createLivenessSessionResponse.body.error.message);
    }
    console.log(createLivenessSessionResponse.body);
    
    const { sessionId } = createLivenessSessionResponse.body;
    
    console.log("Get the liveness detection and verification result.");
    const getLivenessSessionResultResponse = await client
      .path("/detectLivenessWithVerify-sessions/{sessionId}", sessionId)
      .get();
    
    if (isUnexpected(getLivenessSessionResultResponse)) {
      throw new Error(getLivenessSessionResultResponse.body.error.message);
    }
    console.log(getLivenessSessionResultResponse.body);
  };

  nuxtApp.provide('azureFaceLiveness', {
    createLivenessSession,
    createLivenessWithVerifySession,
  })
})
