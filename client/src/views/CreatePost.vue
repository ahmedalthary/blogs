<template>
    <div class=" container px-8 m-auto">
        <div class="create mx-auto my-5">
            <h1> Create Post</h1>
            <form @submit.prevent="create">
                <input v-model="title" type="text" name="title" placeholder="Title">
                <input v-model="snippet" type="text" name="snippet" placeholder="Snippet">
                <textarea v-model="body" name="body" placeholder="Post" cols="30" rows="10"></textarea>
                <div class="error" v-html="error" v-if="error"></div>
                <div v-else v-if="loading" class="loader">
                    <div>
                        <ul>
                            <li>
                                <svg fill="currentColor" viewBox="0 0 90 120">
                                    <path
                                        d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                                    </path>
                                </svg>
                            </li>
                            <li>
                                <svg fill="currentColor" viewBox="0 0 90 120">
                                    <path
                                        d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                                    </path>
                                </svg>
                            </li>
                            <li>
                                <svg fill="currentColor" viewBox="0 0 90 120">
                                    <path
                                        d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                                    </path>
                                </svg>
                            </li>
                            <li>
                                <svg fill="currentColor" viewBox="0 0 90 120">
                                    <path
                                        d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                                    </path>
                                </svg>
                            </li>
                            <li>
                                <svg fill="currentColor" viewBox="0 0 90 120">
                                    <path
                                        d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                                    </path>
                                </svg>
                            </li>
                            <li>
                                <svg fill="currentColor" viewBox="0 0 90 120">
                                    <path
                                        d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z">
                                    </path>
                                </svg>
                            </li>
                        </ul>
                    </div><span>Loading</span>
                </div>
                <button type="submit" :disabled="loading">Create</button>
            </form>
            <div id="toast"
                class="fixed top-24 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert" v-if="success.length || danger.length">
                <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg" :class="{
                    'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200': success.length,
                    'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200': danger.length
                }">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path v-if="success.length"
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        <path v-else
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />

                    </svg>
                    <span class="sr-only">{{ success.length ? 'Check' : 'Error' }} icon</span>
                </div>
                <div class="ms-3 text-sm font-normal">{{ success || danger }}</div>
                <button type="button" @click="success = ''; danger = ''"
                    class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    aria-label="Close">
                    <span class="sr-only">Close</span>
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PostsServices } from '@/services/PostsServices';

const title = ref("")
const snippet = ref("")
const body = ref("")
let error = ref(null)
let loading = ref(false);
let success = ref("")
let danger = ref("")
const route = useRoute()
const router = useRouter()
async function create() {
    error.value = null;
    loading.value = true; // Set loading to true when submitting the form

    try {
        await new Promise((res) => setTimeout(res, 2000))
        const response = await PostsServices.createPost({
            userUuid: route.query.uuid,
            Title: title.value,
            Snippet: snippet.value,
            Body: body.value,
        })
        title.value = ""
        snippet.value = ""
        body.value = ""
        error.value = null
        success.value = response.data.message
        setTimeout(() => {

            router.push({ name: response.data.redirect, query: { uuid: route.query.uuid } })
        }, 5000)
    }
    catch (err) {
        if (err.response.status == 401 || err.response.status == 500) {
            danger.value = err.response.data.error
            setTimeout(() => {
                danger.value = ""
            }, 5000)
            return
        }
        error.value = err.response.data.error
    } finally {
        loading.value = false; // Set loading back to false after API call is completed
    }
}
</script>

<style scoped>
.create {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    padding: 20px;
    width: 400px;
    max-width: 100%;
}

.create h1 {
    padding-bottom: 20px;
    text-align: center;
}

.create form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

form input,
form textarea {
    padding: 15px;
    border: 0;
    background-color: #eef5fc;
    border-radius: 5px;
    color: #6a737c;
    caret-color: auto;
}

form input:focus,
form textarea:focus {
    outline: none;
}

form .error {
    background-color: #fd3939;
    border-radius: 5px;
    width: fit-content;
    padding: 8px;
    color: #fff;
    margin: 0 auto;
}

.loader {
    --background: linear-gradient(135deg, #6c8ebb, rgb(31 41 55));
    --shadow: rgb(31 41 55 / 28%);
    --text: #6C7486;
    --page: rgba(255, 255, 255, 0.36);
    --page-fold: rgba(255, 255, 255, 0.52);
    --duration: 3s;
    margin: 0 auto;
    width: 60px;
    height: 44px;
    position: relative;
}

.loader:before,
.loader:after {
    --r: -6deg;
    content: "";
    position: absolute;
    bottom: 8px;
    width: 35px;
    top: 80%;
    box-shadow: 0 16px 12px var(--shadow);
    transform: rotate(var(--r));
}

.loader:before {
    left: 4px;
}

.loader:after {
    --r: 6deg;
    right: 4px;
}

.loader div {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    position: relative;
    z-index: 1;
    perspective: 600px;
    box-shadow: 0 4px 6px var(--shadow);
    background-image: var(--background);
}

.loader div ul {
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
}

.loader div ul li {
    --r: 180deg;
    --o: 0;
    --c: var(--page);
    position: absolute;
    top: 3px;
    left: 5px;
    transform-origin: 100% 50%;
    color: var(--c);
    opacity: var(--o);
    transform: rotateY(var(--r));
    -webkit-animation: var(--duration) ease infinite;
    animation: var(--duration) ease infinite;
}

.loader div ul li:nth-child(2) {
    --c: var(--page-fold);
    -webkit-animation-name: page-2;
    animation-name: page-2;
}

.loader div ul li:nth-child(3) {
    --c: var(--page-fold);
    -webkit-animation-name: page-3;
    animation-name: page-3;
}

.loader div ul li:nth-child(4) {
    --c: var(--page-fold);
    -webkit-animation-name: page-4;
    animation-name: page-4;
}

.loader div ul li:nth-child(5) {
    --c: var(--page-fold);
    -webkit-animation-name: page-5;
    animation-name: page-5;
}

.loader div ul li svg {
    width: 25px;
    height: 40px;
    display: block;
}

.loader div ul li:first-child {
    --r: 0deg;
    --o: 1;
}

.loader div ul li:last-child {
    --o: 1;
}

.loader span {
    font-size: 12px;
    display: block;
    left: 0;
    right: 0;
    top: 100%;
    margin-top: 4px;
    text-align: center;
    color: var(--text);
}

@keyframes page-2 {
    0% {
        transform: rotateY(180deg);
        opacity: 0;
    }

    20% {
        opacity: 1;
    }

    35%,
    100% {
        opacity: 0;
    }

    50%,
    100% {
        transform: rotateY(0deg);
    }
}

@keyframes page-3 {
    15% {
        transform: rotateY(180deg);
        opacity: 0;
    }

    35% {
        opacity: 1;
    }

    50%,
    100% {
        opacity: 0;
    }

    65%,
    100% {
        transform: rotateY(0deg);
    }
}

@keyframes page-4 {
    30% {
        transform: rotateY(180deg);
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    65%,
    100% {
        opacity: 0;
    }

    80%,
    100% {
        transform: rotateY(0deg);
    }
}

@keyframes page-5 {
    45% {
        transform: rotateY(180deg);
        opacity: 0;
    }

    65% {
        opacity: 1;
    }

    80%,
    100% {
        opacity: 0;
    }

    95%,
    100% {
        transform: rotateY(0deg);
    }
}


form>button {

    background-color: #1F2937;
    color: #fff;
    padding: 15px 20px;
    border: 0;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    width: fit-content;
    margin: 20px auto 0;
    transition: 0.3s;
}

form>button:hover {
    background-color: #2f4056;
}
</style>