<template>
    <div class="container mx-auto my-8 px-4">
        <div class="mb-5">
            <input class="mx-auto focus:outline-none text-[#9ca3af] bg-[#1F2937] rounded-[5px] p-3 mx-auto block w-[50%]"
                type="text" placeholder="Search for post" v-model="searchString" @input="filterPost">
        </div>
        <main class=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 " v-if="posts.length">
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow mx-auto dark:bg-gray-800 dark:border-gray-700"
                v-if="Array.isArray(filteredPosts)" v-for="post in filteredPosts " :key="post.id">
                <a href="#">
                    <img class="rounded-t-lg" src="../assets/img/blog1.jpg" alt="dd" />
                </a>
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

async function postsData() {
    try {

        await new Promise((res) => setTimeout(res, 1000))
        const response = await PostsServices.getPosts()
        response.data.forEach(post => {

            if (post.User.uuid == route.query.uuid) {
                posts.value.push(post)

            }
        });
        if (posts.value.length === 0) {
            posts.value = "There are no posts yet";
        }
        console.log(posts.value)
    } catch (err) {
        console.log(err)
    }
    filteredPosts.value = posts.value

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