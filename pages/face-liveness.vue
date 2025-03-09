<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Face Liveness Detection</h1>
    
    <div class="bg-white shadow-md rounded-lg p-6">
      <div class="mb-6">
        <label class="block mb-2 font-medium text-gray-700">Upload Image</label>
        <input 
          type="file" 
          accept="image/*" 
          @change="onFileChange"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
        >
      </div>
      <button 
        @click="detectLiveness" 
        :disabled="!selectedFile"
        class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Detect Liveness
      </button>
    </div>

    <div v-if="result" class="mt-8 bg-white shadow-md rounded-lg p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Detection Result:</h2>
      <p class="text-gray-700">{{ result }}</p>
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
