<template>

  <div id="home">
    <h1>API Data</h1>

    <div v-if="basicInfo">
      <h2>Basic Info</h2>
      <p>App ID: {{ basicInfo.app_id }}</p>
      <p>Name: {{ basicInfo.name }}</p>
      <p>Description: {{ basicInfo.description }}</p>
      <p>Created by: {{ basicInfo.create_by }}</p>
    </div>
    <div v-if="modelInfo">
      <h2>Model Info</h2>
      <p>Opening Remarks: {{ modelInfo.opening_remarks }}</p>
      <p>Suggestions: {{ modelInfo.suggestions.join(', ') }}</p>
      <p>Suggestions After Answer: {{ modelInfo.suggestions_after_answer }}</p>
      <p>ASR: {{ modelInfo.asr }}</p>
      <p>TTS: {{ modelInfo.tts }}</p>
    </div>
    <div v-if="uploadResponse">
      <h2>Upload Response</h2>
      <p>URL: {{ uploadResponse.url }}</p>
      <img :src="uploadResponse.url" alt="Uploaded Image" v-if="uploadResponse.url" />
    </div>
    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <button @click="fetchData">Fetch Data</button>
    <form @submit.prevent="uploadFile">
      <input type="file" @change="handleFileUpload" />
      <button type="submit">Upload File</button>
    </form>
  </div>




</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'


// get info
const basicInfo = ref(null);
const modelInfo = ref(null);
// post png
const uploadResponse = ref(null);
const file = ref(null);
// temp
const error = ref(null);
const loading = ref(false);
// 
const AUTH_TOKEN = "Fn1u6Yhk01hVi3zW";
const headers = {
  Authorization: `Bearer ${AUTH_TOKEN}`
};

// GET basic info
const fetchData = async () => {
  loading.value = true;
  try {
    const basicInfoResponse = await axios.get('/agentplatform/app_api/basic_info', { headers });
    basicInfo.value = basicInfoResponse.data.data;

    const modelInfoResponse = await axios.get('/agentplatform/app_api/model_info', { headers });
    modelInfo.value = modelInfoResponse.data.data;

    error.value = null;
  } catch (err) {
    error.value = `Error: ${err.message} - ${err.response ? err.response.status : ''}`;
    console.error('Network error details:', err);
  } finally {
    loading.value = false;
  }
};


// button
const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};


// upload file
const uploadFile = async () => {
  if (!file.value) {
    error.value = "Please select a file to upload.";
    return;
  }

  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("user", "your-unique-user-id"); // 替换为实际的用户唯一标识

  try {
    const response = await axios.post('/agentplatform/app_api/plugins/files/upload', formData, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    uploadResponse.value = response.data.data;
    error.value = null;
  } catch (err) {
    error.value = `Error: ${err.message} - ${err.response ? err.response.status : ''}`;
    console.error('Network error details:', err);
  }
};

</script>


<style>
img {
  max-width: 100%;
  height: auto;
}
</style>
