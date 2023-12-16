import Api from "./Api";

const PostsServices = {
  getPosts() {
    return Api().get("posts");
  },
  createPost(postData) {
    return Api().post("Posts", postData);
  },
  searchResult(searchQuery) {
    return Api().get(`Posts/search?q=${searchQuery}`);
  },
  getPost(postUuid) {
    return Api().get(`Posts/${postUuid}`);
  },
  deletePost(postUuid) {
    return Api().delete(`Posts/${postUuid}`);
  },
  updatePost(postData, postUuid) {
    return Api().put(`Posts/${postUuid}`, postData);
  },
};
export { PostsServices };
