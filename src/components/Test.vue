<template>
    <div class="container">
        <div class="wrapper">
            <div class="title-box">
                <h1>TEST</h1>
            </div>
            <div class="content">
                <div class="block">
                    <input type="text" placeholder="Enter your name" @input="name = $event.target.value">
                    <p >Результат: <span>{{ name }}</span></p>
                </div>
                <div class="block">
                    <button @click="updateAccount">Обновить счёт</button>
                    <p>Имя: <span>{{ account.name }}</span></p>
                    <p>Деньги: <span>{{ account.amount }}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { getAccount } from '../js/account';

const name = ref('');
const account = ref({});

const updateAccount = () => {
    account.value = getAccount();
}
</script>


<style>
*{
    transition: .4s;
}
.container{
    background-color: #3d3d3d;
    height: 100vh;
    width: 100vw;
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
}
.wrapper {
    max-width: 1280px;
    margin: 0 auto;
    padding: 50px 20px;
}
.title-box {
    text-align: center;
    font-size: 30px;
    margin-bottom: 40px;
}
.block{
    margin-bottom: 30px;
}
input{
    width: 200px;
    padding: 10px;
    border-radius: 5px;
    background-color: #dbdbdb;
    margin-bottom: 10px;
}
button{
    padding: 10px;
    border-radius: 5px;
    background-color: #dbdbdb;
    cursor: pointer;
    margin-bottom: 10px;
}
button:hover{
    background-color: #80c587;
}
</style>