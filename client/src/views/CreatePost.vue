<template>
    <div class=" container px-8 m-auto">
        <div
            class="create shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] rounded-[10px] p-5 w-[500px] max-w-full mx-auto my-10">
            <h1> Create Post</h1>
            <form class="flex flex-col gap-[10px]" @submit.prevent="create">
                <div class="gap-4 flex items-end chang-img-box mb-4">
                    <img ref="image" class="block rounded border-2 border-[#1F2937]" src="/src/assets/img/placeHolder.jpg"
                        alt="Post image" id="display-account-img">
                    <div class="edit-button-wrapper">
                        <div
                            class=" border border-[#b1b1b1] transition-all duration-300 text-[#585858] font-medium rounded h-[45px] max-w-full hover:border-[#1F2937] mb-3 me-3 ">
                            <input class="hidden" type="file" name="image" @change="uploadImage" id="account-img">
                            <label
                                class="flex items-center justify-center py-[0.6rem] px-[0.75rem] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap h-full  "
                                for="account-img">
                                <i class="fa-solid fa-arrow-up-from-bracket fa-fw inline sm:hidden"></i>
                                <span class="hidden sm:inline">Choose image</span>

                            </label>
                        </div>
                        <button type="button" id="reset-account-img"
                            class="text-white font-medium border-0 rounded transition-all duration-300 max-h-full py-[6px] px-[30px] bg-[#1F2937] flex items-center justify-center hover:bg-[#2f4056]"
                            @click="resetImage">
                            <i class="fa-solid fa-rotate-left fa-fw inline sm:hidden"></i>
                            <span class="hidden sm:inline">Reset</span>
                        </button>
                        <p class="my-0 text-[#585858]">Only JPEG, JPG, PNG are allowed</p>
                    </div>
                </div>
                <!-- <input type="file" name="image" @change="(e) => image = e.target.files[0]"> -->
                <input
                    class="p-[15px] border-0 bg-[#eef5fc] rounded-[5px] text-[#6a737c] caret-[#6a737c] focus:outline-none"
                    v-model="title" type="text" name="title" placeholder="Title">
                <input
                    class="p-[15px] border-0 bg-[#eef5fc] rounded-[5px] text-[#6a737c] caret-[#6a737c] focus:outline-none"
                    v-model="snippet" type="text" name="snippet" placeholder="Snippet">
                <textarea
                    class="p-[15px] border-0 bg-[#eef5fc] rounded-[5px] text-[#6a737c] caret-[#6a737c] focus:outline-none"
                    v-model="body" name="body" placeholder="Post" cols="30" rows="10"></textarea>
                <div class="bg-red-600 rounded-[5px] w-fit p-2 text-white my-0 mx-auto" v-html="error" v-if="error"></div>
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
                <button
                    class="bg-[#1F2937] text-white py-[15px] px-[20px] border-0 rounded font-semibold cursor-pointer w-fit mt-5 mx-auto mb-0 transition-all duration-300 hover:bg-[#2f4056] "
                    type="submit" :disabled="loading">Create</button>
            </form>
            <div id="toast"
                class="fixed top-24 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
                role="alert" v-if="danger.length">
                <div
                    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200">
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />

                    </svg>
                    <span class="sr-only">Error icon</span>
                </div>
                <div class="ms-3 text-sm font-normal">{{ danger }}</div>
                <button type="button" @click="danger = ''"
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
const uploadedImage = ref("")
const title = ref("")
const snippet = ref("")
const body = ref("")
let error = ref(null)
let loading = ref(false);
let danger = ref("")
const route = useRoute()
const router = useRouter()
const image = ref(null)
function uploadImage(e) {
    const uploadedPostImage = e.target.files[0]
    const allowedTypes = ["jpeg", "png", "jpg"]
    if (!allowedTypes.includes(uploadedPostImage.name.split(".").pop().toLowerCase())) {
        image.value.src = "/src/assets/img/NoImagePlaceholder.png"
    } else {

        let currentImage = URL.createObjectURL(uploadedPostImage)
        image.value.src = currentImage
        image.value.onload = function () {
            URL.revokeObjectURL(image.value.src)
        }
    }
    uploadedImage.value = uploadedPostImage;


}
function resetImage(e) {
    image.value.src = "/src/assets/img/placeHolder.jpg"
    uploadedImage.value = ""
    e.currentTarget.previousSibling.firstChild.value = ""


}
async function create() {
    error.value = null;
    loading.value = true; // Set loading to true when submitting the form
    try {
        const formData = new FormData()
        formData.append("image", uploadedImage.value)
        formData.append("userUuid", route.query.uuid)
        formData.append("Title", title.value)
        formData.append("Snippet", snippet.value)
        formData.append("Body", body.value)
        await new Promise((res) => setTimeout(res, 2000))
        const response = await PostsServices.createPost(formData)
        title.value = ""
        snippet.value = ""
        body.value = ""
        error.value = null
        router.push({
            name: response.data.redirect,
            query: {
                uuid: route.query.uuid,
                success: response.data.message,
            }
        })

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
.create h1 {
    padding-bottom: 20px;
    text-align: center;
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



/* start change-img-account-box  */

.chang-img-box #display-account-img {
    width: 150px;
    height: 150px;
}

.chang-img-box .edit-button-wrapper {
    width: 300px;
    max-width: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}

.chang-img-box .edit-button-wrapper p {
    line-height: 1.7;
}

.chang-img-box .edit-button-wrapper #reset-account-img {
    width: fit-content;
    padding: 10px;
    margin: 0;
}

@media (max-width: 575.98px) {
    .chang-img-box .edit-button-wrapper {
        width: 145px;
        font-size: 14px;
        justify-content: center;
    }

    .chang-img-box .edit-button-wrapper .file-upload {
        height: initial;
    }

    .chang-img-box .edit-button-wrapper #reset-account-img,
    .chang-img-box .edit-button-wrapper .file-upload label {
        padding: 0.469rem 1.375rem;
        font-size: 12px;
    }

    .chang-img-box .edit-button-wrapper p {
        text-align: center;
        line-height: 1.5;
    }

    .chang-img-box #display-account-img {
        width: 120px;
        height: 120px;
    }
}

@media (max-width: 351.98px) {
    .chang-img-box .edit-button-wrapper .file-upload {
        margin-right: 1rem !important;
    }

    .chang-img-box .edit-button-wrapper #reset-account-img {
        margin-bottom: 1rem;
    }
}

/* end change-img-account-box  */
</style>