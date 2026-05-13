const form = document.getElementById("expenseForm");
const expensesList = document.getElementById("expenses");

async function loadExpenses() {
  const res = await fetch(`${API_URL}/expenses`);
  const expenses = await res.json();

  expensesList.innerHTML = "";

  expenses.forEach(expense => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${expense.date} -
      $${expense.amount} -
      ${expense.category}
      <button onclick="deleteExpense('${expense.expenseId}')">
        Delete
      </button>
    `;

    expensesList.appendChild(li);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const expense = {
    date: document.getElementById("date").value,
    amount: document.getElementById("amount").value,
    category: document.getElementById("category").value,
    description: document.getElementById("description").value
  };

  await fetch(`${API_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(expense)
  });

  loadExpenses();
});

async function deleteExpense(id) {
  await fetch(`${API_URL}/expenses/${id}`, {
    method: "DELETE"
  });

  loadExpenses();
}

loadExpenses();
