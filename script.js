const form = document.getElementById("transaction-form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const list = document.getElementById("transaction-list");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

let transactions = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = textInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!text || isNaN(amount)) {
    alert("Please enter valid text and amount");
    return;
  }

  const transaction = {
    id: Date.now(),
    text,
    amount
  };

  transactions.push(transaction);
  addTransactionToList(transaction);
  updateSummary();
  textInput.value = "";
  amountInput.value = "";
});

function addTransactionToList(transaction) {
  const li = document.createElement("li");
  li.classList.add(transaction.amount >= 0 ? "income" : "expense");

  li.innerHTML = `
    ${transaction.text} <span>$${transaction.amount.toFixed(2)}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(li);
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  list.innerHTML = "";
  transactions.forEach(addTransactionToList);
  updateSummary();
}

function updateSummary() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts.filter(a => a > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
  const expense = amounts.filter(a => a < 0).reduce((acc, val) => acc + val, 0).toFixed(2);

  balanceEl.textContent = `Balance: $${total}`;
  incomeEl.textContent = `$${income}`;
  expenseEl.textContent = `$${Math.abs(expense)}`; // ✅ Fix is here
}
