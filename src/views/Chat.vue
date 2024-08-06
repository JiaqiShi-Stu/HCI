<script setup>


import { ref } from 'vue';
import axios from 'axios';

const query = ref('hello');
const responseMode = ref('streaming');
const userId = ref('66693174');
const conversationId = ref('');
const messages = ref([]);
const error = ref(null);
const file = ref(null);

const AUTH_TOKEN = 'Fn1u6Yhk01hVi3zW';

const handleFileChange = (event) => {
  file.value = event.target.files[0];
};

const sendMessage = async () => {
  // Clear messages before sending a new request
  messages.value = [];

  const fileUrl = file.value ? URL.createObjectURL(file.value) : '';

  try {
    const response = await axios.post('/agentplatform/app_api/chat', {
      query: query.value,
      response_mode: responseMode.value,
      conversation_id: conversationId.value || undefined,
      user: userId.value,
      files: fileUrl ? [{ type: 'image', url: fileUrl }] : []
    }, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      responseType: 'text' // Ensure responseType is set to 'text'
    });

    const text = response.data;
    const parsedMessages = text.split('\n\n').map(item => {
      try {
        return JSON.parse(item.replace(/^data:\s*/, ''));
      } catch {
        return null;
      }
    }).filter(item => item !== null);

    const fullMessage = parsedMessages.map(message => message.answer).join(' ').replace(/\s+/g, ' ').trim();
    messages.value.push(fullMessage);

  } catch (err) {
    error.value = `Error: ${err.message} - ${err.response ? err.response.status : ''}`;
    console.error('Network error details:', err);
  }
};



</script>

<template>
  <div id="app">
    <h1>Chat API</h1>
    <div>
      <label for="query">Query:</label>
      <input id="query" v-model="query" type="text" />
    </div>
    <div>
      <label for="responseMode">Response Mode:</label>
      <input id="responseMode" v-model="responseMode" type="text" />
    </div>
    <div>
      <label for="userId">User ID:</label>
      <input id="userId" v-model="userId" type="text" />
    </div>
    <div>
      <label for="conversationId">Conversation ID:</label>
      <input id="conversationId" v-model="conversationId" type="text" />
    </div>
    <button @click="sendMessage">Send Message</button>
    <div v-if="messages.length > 0">
  <h2>Responses</h2>
  <div v-for="(message, index) in messages" :key="index">
    <p>{{message}}</p>
  </div>
</div>

    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>
