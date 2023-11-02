const apiURL = "https://653fffe545bedb25bfc18dda.mockapi.io/acts";

fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {
    displayData(data);
  })
  .catch((error) => {
    console.log("Error fetching data: ", error);
  });

const tableBody = document.querySelector(".todo-list");

function displayData(data) {
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const div = document.createElement("div");

    div.classList.add("todo-item");

    div.innerHTML = `
    <p class="number text-end">#${item.id}</p>
        <div class="todo-text">
            <h1>${item.name}</h1>
            <p>${item.desc}</p>
        </div>
        <div class="todo-btn">
            <button data-task-id="${item.id}" class="btn btn-danger">X</button>
            <button data-task-id="${item.id}" class="btn btn-warning">E</button>
        </div>
    `;
    tableBody.appendChild(div);
  });
}

function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById("formulario");
  const formData = new FormData(form);

  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  fetch(apiURL, {
    method: "POST",
    body: JSON.stringify(formObject),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(formObject);
        console.log("Tarea agregada");
        location.reload();
      } else {
        alert("Fallo");
      }
    })
    .catch((error) => {
      console.error("Error ", error);
    });
}

const form = document.getElementById("formulario");
form.addEventListener("submit", submitForm);

function deleteItem(itemId) {
  fetch(`https://653fffe545bedb25bfc18dda.mockapi.io/acts/${itemId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        var divEliminar = document.createElement("div");
        divEliminar.classList.add("eliminar");

        divEliminar.innerHTML = `<p>Tarea ${itemId} eliminada</p>`;

        document.body.appendChild(divEliminar);

        setTimeout(function () {
          divEliminar.classList.add("hidden");
        }, 3000);
        fetchDataAndDisplay();
      } else {
        console.error(`No se pudo eliminar la tarea ${itemId}`);
      }
    })
    .catch((error) => {
      console.error(`Error al eliminar la tarea ${itemId}:`, error);
    });
}

function fetchDataAndDisplay() {
  fetch("https://653fffe545bedb25bfc18dda.mockapi.io/acts")
    .then((response) => response.json())
    .then((data) => {
      displayData(data);
    })
    .catch((error) => {
      console.log("Error ", error);
    });
}

// boton eliminar

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("btn-danger")) {
    const itemId = event.target.getAttribute("data-task-id");
    if (itemId) {
      deleteItem(itemId);
    }
  }
});

// mensaje eliminar

function mensajeEliminar() {
  var divEliminar = document.createElement("div");
  divEliminar.classList.add("eliminar");

  divEliminar.innerHTML = `<p>Tarea eliminada</p>`;

  document.body.appendChild(divEliminar);

  setTimeout(function () {
    divEliminar.classList.add("hidden");
  }, 3000);
}

// boton editar

function vanish() {}

fetchDataAndDisplay();
