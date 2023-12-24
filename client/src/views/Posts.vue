<template>
    <div class="container mx-auto my-8 px-4">
        <div class="mb-5">
            <input
                class="mx-auto focus:outline-none text-[#9ca3af] bg-[#1F2937] rounded-[5px] p-3 mx-auto block w-[90%] sm:w-[70%]"
                type="text" placeholder="Search for post" v-model="searchString" @input="filterPost">
        </div>
        <main class=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 " v-if="posts.length">
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-auto dark:bg-gray-800 dark:border-gray-700"
                v-if="Array.isArray(filteredPosts)" v-for="post in filteredPosts " :key="post.id">
                <img class="rounded-t-lg" v-if="post.Image" :src="`http://localhost:3000/${post.Image}`" alt="Post image" />
                <img class="rounded-t-lg" v-else src="../assets/img/NoImagePlaceholder.png" alt="Post image" />

                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ post.Title }}
                        </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{{ post.Snippet }}</p>
                    <a href="#"
                        class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        @click="moveTo(post)">
                        Read more
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            </div>
            <div v-else>
                <h3>{{ filteredPosts }}</h3>
            </div>
        </main>
        <div v-else>
            loading...
        </div>
    </div>
    <div id="toast"
        class="fixed top-24 right-5 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert" v-if="success.length">
        <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="sr-only">Check icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">{{ success }}</div>
        <button type="button" @click="success = ''"
            class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PostsServices } from '@/services/PostsServices';
const posts = ref([])
const route = useRoute()
const router = useRouter()
const filteredPosts = ref([])
const searchString = ref("")
let success = ref("")


async function postsData() {
    try {

        await new Promise((res) => setTimeout(res, 1000))
        const response = await PostsServices.getPosts()
        if (typeof response.data !== "string") {
            response.data.forEach(post => {

                if (post.User.uuid == route.query.uuid) {
                    posts.value.push(post)

                }
            });
        } else {

            posts.value = response.data;
        }

        console.log(posts.value)

        // Clean the query parameter from the URL


    } catch (err) {
        console.log(err)
    } finally {
        if (route.query.success) {
            success.value = route.query.success;
            setTimeout(() => {
                success.value = ""
            }, 5000)
        }
        router.replace({ query: { ...route.query, success: undefined } });
        filteredPosts.value = posts.value
    }

}
postsData();

function moveTo(post) {
    router.push({
        name: "PostDetails",
        params: { uuid: post.uuid },
        query: {
            uuid: route.query.uuid
        }
    })
}




function filterPost() {
    if (typeof posts.value == "string") {
        return
    }
    filteredPosts.value = posts.value.filter(post =>
        post.Title.toLowerCase().includes(searchString.value.toLowerCase())
        || post.Snippet.toLowerCase().includes(searchString.value.toLowerCase()))
    if (filteredPosts.value.length === 0) {
        filteredPosts.value = `No results found for '${searchString.value}'`
    }


}
</script>

<style  scoped></style>