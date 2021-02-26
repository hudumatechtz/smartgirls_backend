const loginForm = document.forms["form"];
let url = "/account";
document.querySelector("#login-button").addEventListener("click", () => {
  authorize();
});

const authorize = async () => {
  const formData = new FormData();
  formData.append("username", loginForm["username"].value);
  formData.append("password", loginForm["password"].value);
  try {
    const rawFetch = await fetch(url + "/login", {
      method: "post",
      //   headers: {
      //     "Content-type": "application/x-www-form-urlencoded",
      //   },
      body: formData,
    });
    const response = await rawFetch.json();
    console.log(response);
    if (response.match) {
      window.location.replace("/dashboard");
    }
    // window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

// function makeFetch() {
//   let urlLog = url + "/login";

//   console.log(urlLog);
//   fetch(urlLog, {
//     method: "post",
//     // headers: {
//     //   "Content-type": "application/x-www-form-urlencoded",
//     // },
//     body: formData,
//   })
//     .then((rawRes) => {
//       console.log(rawRes);
//       return rawRes.json();
//     })
//     .then((response) => {
//       console.log(response);
//     })
//     .catch((error) => console.error(error));
// }
