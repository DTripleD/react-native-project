import axios from "axios";

class SignInUser {
  async createUser(input) {
    try {
      return await axios
        .post("http://192.168.0.201:19000/api/signin", input)
        .then(({ data }) => {
          return {
            ...data.data,
            token: data.token,
          };
        })
        .catch((e) => Error(e.message));
    } catch (error) {
      console.log(error.message);
    }
  }
}

export { SignInUser };
