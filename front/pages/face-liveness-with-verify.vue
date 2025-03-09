<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Face Liveness Detection with Verify</h1>
    
    <div class="bg-white shadow-md rounded-lg p-6">
      <div class="mb-6">
        <button 
          @click="startLivenessDetection" 
          :disabled="isProcessing"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded transition-colors disabled:opacity-50"
        >
          {{ isProcessing ? 'Processing...' : 'Start Liveness Detection with Verify' }}
        </button>
      </div>

      <div v-if="isProcessing" class="mb-4">
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-blue-600 h-2.5 rounded-full" :style="{ width: `${progress}%` }"></div>
        </div>
      </div>

      <div v-if="livenessResult" class="mt-6">
        <h2 class="text-xl font-semibold mb-2">Detection Result:</h2>
        <div class="p-4 bg-gray-50 rounded-lg">
          <p class="text-gray-700">Status: {{ livenessResult.status }}</p>
        </div>
      </div>

      <div v-if="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
        {{ error }}
      </div>
    </div>
  </div>
</template>
