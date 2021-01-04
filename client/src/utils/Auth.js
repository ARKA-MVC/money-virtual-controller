import axios from "axios";

const IsUserLogin = axios
  .post("/auth/is-login", { withCredentials: true })
  .then((res) => {
    return res;
  })
  .catch((err) => console.log(err));

const UserLogout = () => {
  axios
    .post("/auth/logout", { withCredentials: true })
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        window.location.href = "/sign-in";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export { IsUserLogin, UserLogout };
