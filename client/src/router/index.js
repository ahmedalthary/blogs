import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Posts from "../views/Posts.vue";
import PostDetails from "../views/PostDetails.vue";
import CreatePost from "../views/CreatePost.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/posts",
      name: "Posts",
      component: Posts,
    },
    {
      path: "/posts/:uuid",
      name: "PostDetails",
      component: PostDetails,
    },
    {
      path: "/create-post",
      name: "CreatePost",
      component: CreatePost,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

export default router;
