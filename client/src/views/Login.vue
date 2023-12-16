<template>
    <div class=" container px-8 m-auto">
        <div class="login mx-auto">
            <h1> Login</h1>
            <form @submit.prevent="login">
                <input v-model="email" type="email" name="email" placeholder="Email">
                <input v-model="password" type="password" name="password" placeholder="Password">
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
                <button type="submit" :disabled="loading">Login</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthenticationServices } from '@/services/AuthenticationService';

const email = ref("")
const password = ref("")
let error = ref(null)
let loading = ref(false);
const router = useRouter()
async function login() {
    error.value = null;
    loading.value = true; // Set loading to true when submitting the form
    try {
        await new Promise((res) => setTimeout(res, 2000))

        const response = await AuthenticationServices.login({
            Email: email.value,
            Password: password.value,
        })
        email.value = ""
        password.value = ""
        console.log(response.data)
        error.value = null
        router.push({
            name: "Posts",
            query: { uuid: response.data.uuid }
        })
    }
    catch (err) {
        error.value = err.response.data.error
    } finally {
        loading.value = false; // Set loading back to false after API call is completed
    }
}
</script>
<style scoped>
.login {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 10px;
    padding: 20px;
    width: 400px;
    max-width: 100%;
}

.login h1 {
    padding-bottom: 20px;
    text-align: center;
}

.login form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

form input {
    padding: 15px;
    border: 0;
    background-color: #eef5fc;
    border-radius: 5px;
    color: #6a737c;
    caret-color: auto;
}

form input:focus {
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



form button {

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

form button:hover {
    background-color: #2f4056;
}
</style>