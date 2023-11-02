const apiURL = "https://653fffe545bedb25bfc18dda.mockapi.io/acts";

fetch(apiURL)
  .then((response) => response.json())
  .then((data) => {
    displayData(data); // Change this function name
  })
  .catch((error) => {
    console.log("Error fetching data: ", error);
  });

const tableBody = document.querySelector(".todo-list");

function displayData(data) {
  // Clear the table body
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const div = document.createElement("div");

    div.classList.add("todo-item");

    div.innerHTML = `
    <p class="number text-end">#${item.id}</p>
        <div class="todo-text">
            <h1>${item.name}</h1>
            <p>${item.desc}</p>
            <p>${item.date}</p>
        </div>
        <div class="todo-btn">
            <button data-task-id="${item.id}" class="btn btn-success">O</button>
            <button data-task-id="${item.id}" class="btn btn-danger">X</button>
            <button data-task-id="${item.id}" class="btn btn-warning">E</button>
        </div>
    `;
    tableBody.appendChild(div);
  });
}

// Define a function to delete an item by its ID
function deleteItem(itemId) {
  fetch(`https://653fffe545bedb25bfc18dda.mockapi.io/acts/${itemId}`, {
    method: 'DELETE'
  })
  .then(response => {
    if (response.ok) {
      // Item has been successfully deleted
      // You can update the UI or reload the data if needed
      alert(`La tarea #${itemId} fue eliminado`);

      // After successful deletion, fetch and display the updated data
      fetchDataAndDisplay();
    } else {
      console.error(`Failed to delete item with ID ${itemId}`);
    }
  })
  .catch(error => {
    console.error(`Error deleting item with ID ${itemId}:`, error);
  });
}

// Function to fetch data and display it
function fetchDataAndDisplay() {
  fetch("https://653fffe545bedb25bfc18dda.mockapi.io/acts")
    .then(response => response.json())
    .then(data => {
      displayData(data);
    })
    .catch(error => {
      console.log("Error fetching data: ", error);
    });
}

// Add an event listener to your "Delete" buttons
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('btn-danger')) {
    const itemId = event.target.getAttribute('data-task-id');
    if (itemId) {
      deleteItem(itemId);
    }
  }
});

function vanish() {

}

// Initial data fetch and display
fetchDataAndDisplay();
