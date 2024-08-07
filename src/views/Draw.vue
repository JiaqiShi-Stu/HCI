

<template id="draw">
  <div class="container">
    <div class="box first left">
      <div v-if="imageDataUrlFir">
      <h2>First Image</h2>
      <img :src="imageDataUrlFir" alt="First Image" />
    </div>

    </div>
    <div class="mid">
      <div class="inner-mid">
        <div class="tips">
          <p>{{ tipsMiao }}</p>
        </div>
        <div class="ip">
          <input type="file" id="cameraInput" @change="handleFileSelect" />
          <button class="cameraButton" @click="triggerClick">Upload File</button>
        </div>
      </div>
    </div>
    <div class="box secend right">
      <div v-if="imageDataUrlSec">
      <h2>Second Image</h2>
      <img :src="imageDataUrlSec" alt="Second Image" />
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue';

import axios from 'axios';

const token = ref('');
const imageDataUrlFir = ref('img_bac.jpg');
const imageDataUrlSec = ref('img_bac.jpg');
const please = ref('');
const xiaomiao = ref('该小妙了');
const finish = ref('结束');
const tipsMiao = ref('(先在纸上画几笔后，点击”小妙”让其作画)');

onMounted(() => {
  initializePage();
});

function initializePage() {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const formdata = new FormData();
  formdata.append('account', "599048259@qq.com");
  formdata.append('password', 'Zhujingjie1995.');
  axios.post('https://api.aisketcher.com/auth/login', formdata, config)
    .then(res => {
      axios.get('https://api.aisketcher.com/view/rollback/getResult?msgId=' + res.data.data, config)
        .then(response => {
          token.value = response.data.data.result.data.tokens.token;
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(error => {
      console.log(error);
    });
}



function triggerClick() {
  document.querySelector('#cameraInput').click();
}

async function handleFileSelect(event) {
  const file = event.target.files[0];
  showCustomPopup2(file);
}

function showCustomPopup2(file) {
  alert('小妙处理中...');
  imageDataUrlSec.value = "loading3.gif";
  getapi(file);
}


async function getapi(file) {
  const result = await osssignature({ picType: 1, version: 0, style: '.' + file.name.split('.')[1] });
  await ossFileUpload(result.data.result.data, file);
  const result_1 = await insertWork(result.data.result.data.key, file.name.split(".")[0]);
  const img_input = result_1.data.result.data.realInputPath;
  const result_2 = await genStick(result.data.result.data.key, result_1.data.result.data.workId, '8ha8azu1uq');

  // 假设img_input和result_2.data.result.data.realOutputPath是相对路径或URL
  imageDataUrlFir.value = img_input;
  imageDataUrlSec.value = result_2.data.result.data.realOutputPath;
  const result_3 = await isWork('8ha8azu1uq');
  if (!result_3.data.data) {
    const result_4 = await startDraw(result_2.data.result.data.outputPath, result_2.data.result.data.outputId, '8ha8azu1uq');
    console.log(result_4);
  } else {
    alert("机器人忙碌，请稍后再试！");
  }
}

async function startDraw(inputPath, outputId, robotId) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token.value,
    },
  };
  const formData = new FormData();
  formData.append("inputPath", inputPath);
  formData.append("outputId", outputId);
  formData.append("robotId", robotId);
  const data = await axios.post("https://api.aisketcher.com/view/robot/startDraw", formData, config);
  return data;
}

async function isWork(robotId) {
  const config = {
    headers: {
      'Authorization': token.value,
    },
  };
  return await axios.get('https://api.aisketcher.com/view/robot/isWork?robotId=' + robotId, config);
}

async function genStick(key, workId, robotId) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token.value,
    },
  };
  const formData = new FormData();
  formData.append("workId", workId);
  formData.append("inputPath", key);
  formData.append("robotId", robotId);
  const data = await axios.post("https://api.aisketcher.com/view/genStick", formData, config);
  await new Promise(resolve => setTimeout(resolve, 20000));
  const result = await getReults(data.data.data);
  return result.data;
}

async function insertWork(key, name) {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token.value,
    },
  };
  const formData = new FormData();
  formData.append("name", name);
  formData.append("inputPath", key);
  const data = await axios.post("https://api.aisketcher.com/view/insertWork", formData, config);
  const result = await getReults(data.data.data);
  return result.data;
}

async function osssignature(params) {
  const { picType, version, style } = params;
  const formData = new FormData();
  formData.append('picType', picType);
  formData.append('version', version);
  formData.append('style', style);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': token.value,
    },
  };
  const data = await axios.post("https://api.aisketcher.com/view/oss/signature", formData, config);
  const result = await getReults(data.data.data);
  console.log(result);
  return result.data;
}

async function ossFileUpload(params, file) {
  params.ossaccessKeyId = params.oSSAccessKeyId;
  const formData = new FormData();
  formData.append("key", params.key);
  formData.append("OSSAccessKeyId", params.oSSAccessKeyId);
  formData.append("policy", params.policy);
  formData.append("Signature", params.signature);
  formData.append("success_action_status", "200");
  formData.append("file", file);
  return await axios.post("https://aisketcher.oss-cn-zhangjiakou.aliyuncs.com", formData, { headers: { 'Content-Type': 'multipart/form-data' } });
}

async function getReults(id) {
  return await axios.get('https://api.aisketcher.com/view/rollback/getResult?msgId=' + id);
}


</script>



<style>
  h2 {
    font-family: Candara,Calibri,Segoe,Segoe UI,Optima,Arial,sans-serif;
    color: #888;
  }
  h2.sec-page-top {
    padding-top: 110px;
    /* font-size: 45px;
    color:#B5B5B5; */
  }
  .page .page-content {
    padding-top: 100px; 
  }
  .first {
    background-image: url(/first.jpg);
    background-size: cover;
    background-position: center center; /* 将背景图像水平和垂直居中 */
    background-repeat: no-repeat; /* 禁止背景图像重复 */
    background-color: rgba(0, 0, 0, 0.2);
  }
  .secend {
    background-image: url(/sec_bac.jpg);
    background-size: cover;
    background-position: center center; /* 将背景图像水平和垂直居中 */
    background-repeat: no-repeat; /* 禁止背景图像重复 */
    background-color: rgba(0, 0, 0, 0.2);
  }
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .box {
    flex: 35%;
    width: calc(50vw - 20px); /* 设置宽度为屏幕宽度的一半，并减去边距 */
    padding: 50px;
  }
  .right{
    padding-left: 0px;
  }
  .left{
    padding-right: 0px;
  }
  .mid{
    flex: 30%;
  }
  .box img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 图片填充框，保持比例 */
    border: 1vw solid rgb(210, 199, 182);
    min-width: 100%;
    min-height: 100%;
  }

  .inner-mid{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  .tips{
    flex: 20%; /* 占1/3的高度 */
    font-size: 10px ;
    color: rgb(141,110,81);
  }
  .but{
    flex: 10%; /* 占1/3的高度 */
    padding: 20px;
    padding-bottom: 10px;
  }
  .ip{
    flex: 70%; /* 占1/3的高度 */
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    padding: 20px;
    padding-top: 0px;
  }
  .ipimg{
    width: 75%;
    height: auto;
    max-width: 100%; /* 防止图像超出父元素宽度 */
    object-fit: cover; /* 图片填充框，保持比例 */
    /* border: 1vw solid rgb(210, 199, 182); */
  }
  .ip-left,.ip-right{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .ip-left-jiantou,.ip-right-jiantou{
    flex:20%;
  }
  /* .ip-1,.ip-2{
    box-shadow:none;
    -webkit-box-shadow: none;
  } */
  .jiantou{
    width: 45%;
    height: auto;
    max-width: 100%; /* 防止图像超出父元素宽度 */
    object-fit: cover; /* 图片填充框，保持比例 */
  }
  .but2{
    padding-right: 20px;
    padding-left: 20px;
  }
  .button1 {
    padding-top: 0px;
  }
  .button2 {
    padding-top: 10px;
  }
  .button1,.button2 {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 17px;
  }
  .button-fab{
    background-color: rgb(210, 199, 182);
  }
  .cameraButton {
    appearance: button;
    -webkit-appearance: button; /* 兼容性支持 Safari 和 Chrome */
    -moz-appearance: button; /* 兼容性支持 Firefox */
    padding: 10px 20px;
    font-size: 14px;
    text-align: center;
    text-decoration: none;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

  }
  .change_language{
    text-align: right;
  }
  .chinese,.english{
    display: inline-block;
  }
  .chinese,.english{
    line-height:32px;
    min-height:10px;
    min-width:22px;
    font-size:12px
  }
  #cameraInput {
    display: none;
  }      
  .cameraButton:hover {
    background-color: #0056b3;
  }
  .cameraButton:focus {
    outline: none;
  }
  .button-jiantou{
    color:rgb(210, 199, 182);
    font-weight: bold;
  }

  .button-miao{
    background-image: url(/miao_bac.jpg);
    background-size: cover;
    opacity: 0.66;
  }

  .button-fin{
    background-image: url(/fin_bac.jpg);
    background-size: cover;
    opacity: 0.66;
  }
  .welcome-text{
    color: rgb(122,99,65);
  }
  .begin-div{
    width: 70%;
    height: 85%;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
  }
  .begin{
    float: left;
    width: 70%; /* 占70%宽度 */
    height: 100%; /* 占页面高度的30% */
    text-decoration: none; /* 去掉下划线 */
    color: inherit; /* 继承父元素的颜色 */
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center-image {
    display: block;
    max-width: 100%;
    max-height: 100%;
    /* width: 85%; */
    margin: auto;
  }
</style>
