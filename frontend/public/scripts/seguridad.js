const token = localStorage.getItem("token");
if (token) {
  verificarTokenVigente();
} else {
  window.location.href = "/";
}

function verificarTokenVigente() {
  fetch("/verificar", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 200) {
      console.log("token valido");
    } else {
      console.log("token invalido");
      localStorage.removeItem("token");
      localStorage.removeItem("data_user");
      window.location.href = "/";
    }
  });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("data_user");
  window.location.href = "/";
}
