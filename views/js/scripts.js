function login() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3333/api/author/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        alert("Login Failed");
        return;
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);

      await getAuthors();
    } catch (error) {
      console.log("Login error:", error);
    }
  });
}




async function getAuthors() {
  let accessToken = localStorage.getItem("accessToken");
  const accessTokenExpTime = getTokenExpTime(accessToken);
  console.log("Token exp:", accessTokenExpTime);

  if (accessTokenExpTime) {
    const currentTime = new Date();
    if (currentTime >= accessTokenExpTime) {
      console.log("Token muddati tugagan, yangilanmoqda...");
      accessToken = await refreshToken();
    } else {
      console.log("Token faol");
    }
  } else {
    console.log("Token mavjud emas");
    return;
  }
console.log(accessToken)
  try {
    const response = await fetch("http://localhost:3333/api/author/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("Request failed with status:", response.status);
      return;
    }

    const authorData = await response.json();
    displayAuthors(authorData.authors);
  } catch (error) {
    console.log("Error:", error);
  }
}

function displayAuthors(authorsData) {
  const authorsList = document.getElementById("list-authors");
  authorsList.innerHTML = "";

  authorsData.forEach((author) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    listItem.innerHTML = `
      <strong>To'liq ismi:</strong> ${author.first_name} ${author.last_name}<br>
      <strong>Taxallusi:</strong> ${author.nick_name}<br>
      <strong>Ma'lumot:</strong> ${author.info}<br>
      <strong>Lavozimi:</strong> ${author.position}
    `;

    authorsList.appendChild(listItem);
  });
}

function getTokenExpTime(token) {
  if (!token) return null;

  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    if (decodedToken.exp) {
      return new Date(decodedToken.exp * 1000);
    }
  } catch (error) {
    console.log("Tokenni parse qilishda xatolik:", error);
  }

  return null;
}

async function refreshToken() {
  const loginUrl = "/login";

  try {
    const response = await fetch("http://localhost:3333/api/author/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data?.message === "jwt expired") {
      alert("Refresh token ham eskirgan. Qaytadan login qiling.");
      return window.location.replace(loginUrl);
    }

    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log("Refresh token error:", error);
    return window.location.replace(loginUrl);
  }
}
