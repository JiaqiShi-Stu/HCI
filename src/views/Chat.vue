<template>
  <div>
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
      <div v-for="message in messages" :key="message.message_id">
        <p><strong>Event:</strong> {{ message.event }}</p>
        <p><strong>Answer:</strong> {{ message.answer }}</p>
      </div>
    </div>
    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const query = ref('');
const responseMode = ref('streaming');
const userId = ref('');
const conversationId = ref('');
const messages = ref([]);
const error = ref(null);

const AUTH_TOKEN = 'Fn1u6Yhk01hVi3zW';

const sendMessage = async () => {
  try {
    const response = await axios.post('https://open.oppomobile.com/agentplatform/app_api/chat', {
      query: query.value,
      response_mode: responseMode.value,
      conversation_id: conversationId.value || undefined,
      user: userId.value,
      files: []
    }, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // Assuming the response data is structured as described
    messages.value = response.data; // Adjust according to actual response structure
  } catch (err) {
    error.value = `Error: ${err.message} - ${err.response ? err.response.status : ''}`;
    console.error('Network error details:', err);
  }
};
</script>
