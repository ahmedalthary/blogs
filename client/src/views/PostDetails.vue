<template>
    <div v-if="postDetails">
        <div class="top-section my-8 flex justify-center gap-20 sm:gap-32 px-4 items-center">
            <div>
                <h2>{{ postDetails.Title }}</h2>
                <h4>Published by {{ postDetails.User.UserName }} •
                    {{ formatTimeAgo(postDetails.createdAt) }}
                </h4>
            </div>
            <div>
                <button class="bg-red-500 border-none text-white px-3 py-2 rounded-md mr-3"
                    @click="update = false; open = true">Delete</button>
                <button class=" bg-green-500 border-none text-white px-3 py-2 rounded-md"
                    @click="update = true; open = true">Update</button>
            </div>
        </div>
        <div class="bottom-section container my-8 mx-auto px-4 break-words leading-7 ">
            {{ postDetails.Body }}
        </div>

    </div>
    <div v-else>
        loading...
    </div>

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
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>
    </div>

    <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="open = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div class="sm:flex sm:items-start">
                                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
                                        v-if="!update">
                                        <ExclamationTriangleIcon class="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
                                        v-if="update">
                                        <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div v-if="!update" class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                                            Delete the post</DialogTitle>
                                        <div class="mt-2">
                                            <p class="text-sm text-gray-500">Are you sure you want to delete the
                                                {{ postDetails.Title }} post?</p>
                                        </div>
                                    </div>
                                    <div v-if="update" class="flex-1 mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">
                                            Update the post</DialogTitle>
                                        <div class="mt-2">
                                            <form class="flex flex-col gap-[10px]">
                                                <input
                                                    class="p-[15px] border-0 bg-[#eef5fc] rounded-[5px] text-[#6a737c] caret-[#6a737c] focus:outline-none"
                                                    v-model="title" type="text" name="title" placeholder="Title">
                                                <input
                                                    class="p-[15px] border-0 bg-[#eef5fc] rounded-[5px] text-[#6a737c] caret-[#6a737c] focus:outline-none"
                                                    v-model="snippet" type="text" name="snippet" placeholder="Snippet">
                                                <textarea
                                                    class="p-[15px] border-0 bg-[#eef5fc] rounded-[5px] text-[#6a737c] caret-[#6a737c] focus:outline-none"
                                                    v-model="body" name="body" placeholder="Post" cols="30"
                                                    rows="10"></textarea>
                                                <div class="bg-red-600 rounded-[5px] w-fit p-2 text-white my-0 mx-auto"
                                                    v-html="error" v-if="error"></div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="dot-spinner" v-if="loading">
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                            </div>
                            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    v-if="!update" @click="deletePost">Delete</button>
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                                    v-if="update" @click="updatePost">Update</button>
                                <button type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    @click="open = false" ref="cancelButtonRef">Cancel</button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { computed, onUpdated, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { CheckIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { PostsServices } from '@/services/PostsServices';
const postDetails = ref(null)
const title = ref("")
const snippet = ref("")
const body = ref("")
let loading = ref(false);
let success = ref("")
let danger = ref("")
let error = ref(null)
const update = ref(false)
const open = ref(false)
const route = useRoute()

async function postData() {
    try {
        await new Promise((res) => setTimeout(res, 1000))
        const response = await PostsServices.getPost(route.params.uuid)
        postDetails.value = response.data
        title.value = postDetails.value.Title
        snippet.value = postDetails.value.Snippet
        body.value = postDetails.value.Body
        console.log(postDetails.value)
    } catch (err) {
        console.log(err)
    }
}
postData()

function formatTimeAgo(dateString) {
    // Step 1: Create Date objects for the current date and the post date
    const currentDate = new Date();
    const postDate = new Date(dateString);

    // Step 2: Calculate the difference in seconds between the current date and the post date
    const seconds = Math.floor((currentDate - postDate) / 1000);

    // Step 3: Calculate the interval in years
    let interval = Math.floor(seconds / 31536000);

    // Step 4: Check if the interval is greater than 1 year
    if (interval >= 1) {
        return `${interval} years ago`;
    }

    // Step 5: Calculate the interval in months
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return `${interval} months ago`;
    }

    // Step 6: Calculate the interval in days
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return `${interval} days ago`;
    }

    // Step 7: Calculate the interval in hours
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return `${interval} hours ago`;
    }

    // Step 8: Calculate the interval in minutes
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return `${interval} minutes ago`;
    }
    // Step 9: If none of the above conditions are met, return the interval in seconds
    interval = Math.floor(seconds);
    if (interval >= 10) {
        return `${interval} seconds ago`;
    }

    return "just now";
}
computed(() => formatTimeAgo(dateString))

const router = useRouter()

async function deletePost() {
    loading.value = true;
    try {
        await new Promise((res) => setTimeout(res, 2000))
        const response = await PostsServices.deletePost(route.params.uuid)
        open.value = false
        await new Promise((res) => setTimeout(res, 300))
        console.log(response)
        success.value = response.data.message
        setTimeout(() => {

            router.replace({
                name: response.data.redirect,
                query: { uuid: route.query.uuid }
            })
        }, 5000)

    } catch (err) {
        open.value = false
        await new Promise((res) => setTimeout(res, 300))
        danger.value = err.response.data.error
        setTimeout(() => {
            danger.value = ""
        }, 5000)
    } finally {
        loading.value = false;
    }

}

async function updatePost() {
    error.value = null;
    loading.value = true; // Set loading to true when submitting the form

    try {
        await new Promise((res) => setTimeout(res, 2000))
        const response = await PostsServices.updatePost({
            Title: title.value,
            Snippet: snippet.value,
            Body: body.value,
        }, route.params.uuid)
        title.value = ""
        snippet.value = ""
        body.value = ""
        error.value = null
        open.value = false
        await new Promise((res) => setTimeout(res, 300))
        postData()
        success.value = response.data.message
        setTimeout(() => {
            success.value = ""
        }, 5000)
    }
    catch (err) {
        if (err.response.status == 401 || err.response.status == 500) {
            open.value = false
            await new Promise((res) => setTimeout(res, 300))
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
.dot-spinner {
    --uib-size: 2.8rem;
    --uib-speed: .9s;
    --uib-color: #183153;
    margin: 20px auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: var(--uib-size);
    width: var(--uib-size);
}

.dot-spinner__dot {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
}

.dot-spinner__dot::before {
    content: '';
    height: 20%;
    width: 20%;
    border-radius: 50%;
    background-color: var(--uib-color);
    transform: scale(0);
    opacity: 0.5;
    animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
    box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
}

.dot-spinner__dot:nth-child(2) {
    transform: rotate(45deg);
}

.dot-spinner__dot:nth-child(2)::before {
    animation-delay: calc(var(--uib-speed) * -0.875);
}

.dot-spinner__dot:nth-child(3) {
    transform: rotate(90deg);
}

.dot-spinner__dot:nth-child(3)::before {
    animation-delay: calc(var(--uib-speed) * -0.75);
}

.dot-spinner__dot:nth-child(4) {
    transform: rotate(135deg);
}

.dot-spinner__dot:nth-child(4)::before {
    animation-delay: calc(var(--uib-speed) * -0.625);
}

.dot-spinner__dot:nth-child(5) {
    transform: rotate(180deg);
}

.dot-spinner__dot:nth-child(5)::before {
    animation-delay: calc(var(--uib-speed) * -0.5);
}

.dot-spinner__dot:nth-child(6) {
    transform: rotate(225deg);
}

.dot-spinner__dot:nth-child(6)::before {
    animation-delay: calc(var(--uib-speed) * -0.375);
}

.dot-spinner__dot:nth-child(7) {
    transform: rotate(270deg);
}

.dot-spinner__dot:nth-child(7)::before {
    animation-delay: calc(var(--uib-speed) * -0.25);
}

.dot-spinner__dot:nth-child(8) {
    transform: rotate(315deg);
}

.dot-spinner__dot:nth-child(8)::before {
    animation-delay: calc(var(--uib-speed) * -0.125);
}

@keyframes pulse0112 {

    0%,
    100% {
        transform: scale(0);
        opacity: 0.5;
    }

    50% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>