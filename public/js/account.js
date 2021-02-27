const loginForm = document.forms["form"];
let url = "/account";
const spinner = document.querySelector(".not-spin");
const loginBtn = document.querySelector("#login-button");
loginBtn.addEventListener("click", () => {
  authorize();
});

const authorize = async () => {
  spinner.classList.remove('not-spin');
  loginBtn.classList.add("not-spin");
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
    spinner.classList.add('not-spin');
    spinner.classList.remove('not-spin');
    // window.location.reload();
  } catch (error) {
    spinner.classList.add('not-spin');
    loginBtn.classList.remove('not-spin');
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
