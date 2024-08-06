<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const AUTH_TOKEN = 'Fn1u6Yhk01hVi3zW';

// 聊天发起
const query = ref('hello');
const responseMode = ref('streaming');
const userId = ref('66693174');
const conversationId = ref('');

// 聊天文字
const messages = ref([]);
const error = ref(null);

// URL  
const file = ref(null);
const uploadResponse = ref(null);

// button 处理上传文件，赋值file
const handleFileUpload = (event) => {
  file.value = event.target.files[0];
};

// return URL uploadResponse.value.url
const uploadFile = async () => {
  if (!file.value) {
    error.value = "Please select a file to upload.";
    return;
  }

  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("user", userId.value);

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

// 发起聊天
const pipe_choice = async () => {
  // 清空对话
  messages.value = [];
  // 检测是否有图片上传
  let fileUrl = '';
  if (file.value) {
    await uploadFile();
    fileUrl = uploadResponse.value ? uploadResponse.value.url : '';
  }

  if (checkQuery.value) {
    messages.value.push('风格迁移');
  } else {
    await oppo_chat(fileUrl);
  }
};

// 检测 query 中是否包含 "风格"
const checkQuery = computed(() => {
  return query.value.includes('风格');
});

// 发起聊天请求
const oppo_chat = async (fileUrl) => {
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

    const text = response.data; // 数据流
    // 获取对应文字
    const parsedMessages = text.split('\n\n').map(item => {
      try {
        return JSON.parse(item.replace(/^data:\s*/, ''));
      } catch {
        return null;
      }
    }).filter(item => item !== null);

    // 文字后处理
    const fullMessage = parsedMessages.map(message => message.answer).join(' ').replace(/\s+/g, ' ').trim();
    messages.value.push(fullMessage);

  } catch (err) {
    error.value = `Error: ${err.message} - ${err.response ? err.response.status : ''}`;
    console.error('Network error details:', err);
  }
};

</script>


<template>
  <div id="Chat">
    <h1>Chat API</h1>
    <div>
      <label for="query">Query:</label>
      <input id="query" v-model="query" type="text" />
    </div>
    <!-- <div>
      <label for="conversationId">Conversation ID:</label>
      <input id="conversationId" v-model="conversationId" type="text" />
    </div> -->

    <button @click="pipe_choice">Send Message</button>
    <div v-if="messages.length > 0">
  <h2>Responses</h2>
  <div v-for="(message, index) in messages" :key="index">
    <p>{{message}}</p>
  </div>
</div>

    <div v-if="uploadResponse">
      <h2>Upload Response</h2>
      <p>URL: {{ uploadResponse.url }}</p>
      <img :src="uploadResponse.url" alt="Uploaded Image" v-if="uploadResponse.url" />
    </div>

    <div v-if="error">
      <p>Error: {{ error }}</p>
    </div>

  </div>


  <form @submit.prevent="uploadFile">
      <input type="file" @change="handleFileUpload" />
      <button type="submit">Upload File</button>
  </form>
</template>



<style>
img {
  max-width: 100%;
  height: auto;
}
</style>

