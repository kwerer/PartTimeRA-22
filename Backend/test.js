import axiosInstance from "./axiosInstance.js";

function testing() {
  axiosInstance
    .post("/testing", { name: "joseph", age: "23" })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

export default testing;
