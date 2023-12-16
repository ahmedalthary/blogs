import Api from "./Api";

const AuthenticationServices = {
  register(credentials) {
    return Api().post("register", credentials);
  },
  login(credentials) {
    return Api().post("login", credentials);
  },
};
export { AuthenticationServices };
