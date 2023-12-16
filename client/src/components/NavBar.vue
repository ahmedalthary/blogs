<template>
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
                <div class="flex flex-1 items-center justify-center mr-24 sm:mr-0 sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center cursor-pointer" @click="moveTo('Home')">
                        <img class="h-8 w-auto" src="../assets//logo.png" alt="Your Company" />
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <a v-for="item in navigation" :key="item.name" class=" cursor-pointer"
                                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                                :aria-current="item.current ? 'page' : undefined"
                                @click="moveTo(item.name)">{{ item.name }}</a>
                        </div>
                    </div>
                </div>
                <div class="relative">
                    <input type="search" placeholder="Search for post" v-model="searchQuery" @input="getSearchResult">
                    <ul class="absolute bg-[#1F2937] top-[2.8rem] left-0 w-full rounded text-white">
                        <li class="border-b last:border-b-0 border-white p-3" v-if="searchQuery.length"
                            v-for="searchResult in searchResults" :key="searchResult.uuid">
                            {{ searchResult.Title }}
                        </li>
                        <p v-if="searchQuery.length && !searchResults.length">
                            {{ noResults }}
                        </p>
                    </ul>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button type="button" @click="moveTo('Login')"
                        class="relative rounded-md py-2 px-3 bg-yellow-50 text-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        Login
                    </button>
                    <button type="button" @click="moveTo('Register')"
                        class="relative  ml-3 rounded-md py-2 px-3 bg-yellow-50 text-gray-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        Signup
                    </button>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <DisclosureButton v-for="item in navigation" :key="item.name" as="a" class=" cursor-pointer"
                    :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>
  
<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { PostsServices } from '@/services/PostsServices';


const navigation = ref([
    { name: 'Posts', current: false },
    { name: 'CreatePost', current: false },
    // { name: 'Projects', current: false },
    // { name: 'Calendar', current: false },
])

onMounted(() => {
    const storedState = JSON.parse(localStorage.getItem('navigationState') || '[]');
    if (storedState.length === navigation.value.length) {
        navigation.value.forEach((item, index) => {
            item.current = storedState[index].current;
        });
    }
});
const router = useRouter()
const route = useRoute()

function moveTo(viewName) {
    navigation.value.forEach((item) => {
        item.current = item.name === viewName;
    });
    localStorage.setItem('navigationState', JSON.stringify(navigation.value));
    router.push({ name: viewName, query: { uuid: route.query.uuid } })
}


const searchQuery = ref("")
const searchResults = ref([])
const noResults = ref("")

async function getSearchResult() {
    searchResults.value = []
    noResults.value = ""
    await new Promise((res) => setTimeout(res, 300))
    try {
        const response = await PostsServices.searchResult(searchQuery.value)
        searchResults.value = response.data
        console.log(searchResults.value)

    } catch (err) {
        noResults.value = err.response.data.error
        console.log(noResults.value)
    }
}

</script>