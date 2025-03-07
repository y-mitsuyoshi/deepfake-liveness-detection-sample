<template>
  <div>
    <h1>Face Liveness Detection</h1>
    <input type="file" accept="image/*" @change="onFileChange">
    <button @click="detectLiveness" :disabled="!selectedFile">Detect Liveness</button>
    <div v-if="result">
      <h2>Detection Result:</h2>
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const selectedFile = ref(null);
    const result = ref(null);
    const $azureFace = inject('azureFace');

    const onFileChange = (event) => {
      selectedFile.value = event.target.files[0];
    };

    const detectLiveness = async () => {
      if (!selectedFile.value) {
        alert('Please select an image.');
        return;
      }

      const file = selectedFile.value;
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      try {
        const faceDetectResponse = await $azureFace.path("/face/v1.0/detect").post({
            body: uint8Array,
            contentType: "application/octet-stream",
            queryParameters: {
                returnFaceAttributes: ["liveness"]
            }
        });

        if (faceDetectResponse.status === 200) {
          const faces = faceDetectResponse.body;
          if (faces && faces.length > 0) {
            result.value = `Liveness: ${faces[0].faceAttributes.liveness}`;
          } else {
            result.value = 'No faces detected.';
          }
        } else {
          result.value = `Error: ${faceDetectResponse.status}`;
        }
      } catch (error) {
        console.error("Error detecting faces:", error);
        result.value = `Error: ${error.message}`;
      }
    };

    return {
      selectedFile,
      result,
      onFileChange,
      detectLiveness,
    };
  },
};
</script>
