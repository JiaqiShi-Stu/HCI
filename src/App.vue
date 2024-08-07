<template>
  <div id="app">
    <!-- Navigation Buttons -->
    <button @click="goToHome">Go to Home</button>
    <button @click="goToChat">Go to Chat</button>
    <button @click="goToDraw">Go to Draw</button>

    <!-- Route View -->
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// 使用 Vue Router
const router = useRouter();

// 跳转到 Home 页
const goToHome = () => {
  router.push('/home');
};

// 跳转到 Chat 页
const goToChat = () => {
  router.push('/chat');
};

// 跳转到 Draw 页
const goToDraw = () => {
  router.push('/draw');
};
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
    background-image: url(first.jpg);
    background-size: cover;
    background-position: center center; /* 将背景图像水平和垂直居中 */
    background-repeat: no-repeat; /* 禁止背景图像重复 */
    background-color: rgba(0, 0, 0, 0.2);
  }
  .secend {
    background-image: url(sec_bac.jpg);
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
    background-image: url(miao_bac.jpg);
    background-size: cover;
    opacity: 0.66;
  }

  .button-fin{
    background-image: url(fin_bac.jpg);
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

