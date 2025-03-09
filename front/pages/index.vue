<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">Welcome to Deepfake Liveness Detection</h1>
    <NuxtLink 
      to="/face-liveness" 
      class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 mr-4"
    >
      Start Face Liveness Detection
    </NuxtLink>
    <NuxtLink 
      to="/face-liveness-with-verify" 
      class="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
    >
      Start Face Liveness Detection with Verify
    </NuxtLink>
  </div>
</template>

<script setup>
// No additional script needed
</script>

<style scoped>
div {
  padding: 20px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}
</style>
