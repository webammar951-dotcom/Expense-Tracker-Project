// ============================================
// EXPENSE TRACKER — Your JS Task 💪
// ============================================

// ── Step 1: Get all elements from HTML ──
// Hint: use document.getElementById()
const titleInput = document.getElementById('titleInput')
const amountInput = document.getElementById('amountInput')
const typeInput = document.getElementById('typeInput')
const categoryInput = document.getElementById('categoryInput')
const addBtn = document.getElementById('addBtn')
const expenseList = document.getElementById('expenseList')
const emptyState = document.getElementById('emptyState')
const clearAllBtn = document.getElementById('clearAllBtn')
const totalAmount = document.getElementById('totalAmount')
const totalIncome = document.getElementById('totalIncome')
const totalExpense = document.getElementById('totalExpense')
const currentDate = document.getElementById('currentDate')
const filterBtns = document.querySelectorAll(".filter-btn")

// ── Step 2: Load expenses from localStorage ──
// Hint: same as your Notes App!
let expenses = JSON.parse(localStorage.getItem("expenses"))|| []

// ── Step 3: Show today's date ──
// Hint: use new Date()
currentDate.textContent = new Date()

// ── Step 4: Add transaction on button click ──
addBtn.addEventListener("click", () => {
    // Get values from inputs
        const title = titleInput.value
    const amount = amountInput.value
    const type = typeInput.value
    const category = categoryInput.value

       if (type === "expense") {
        const currentIncome = expenses
            .filter(e => e.type === "income")
            .reduce((sum, e) => sum + Number(e.amount), 0)
        if (currentIncome === 0) {
            alert("Add income first!")
            return
        }
    }
    

    // Validate — check if title and amount are not empty
    if (!title || !amount) {
        alert("Please fill all fields!")
        return
    }

    // Create expense object
    // Hint: use Date for timestamp, Math.random() or Date.now() for id
        let a = Math.random()
let rand = "123456" + a
let idvalue = rand.slice(8)
    const expense = {
    
        id: idvalue,
        title:title ,
        amount: amount,
        type: type,
        category:category ,
        date: currentDate.textContent
    }

    // Add to array
    // Hint: use spread operator [...expenses, expense]
    expenses = [...expenses, expense]
    localStorage.setItem("expenses",JSON.stringify(expenses))

    // Save to localStorage
    

    // Clear inputs
    titleInput.value = ""
    amountInput.value = ""

    // Refresh UI
    displayExpenses()
    updateSummary()
})

// ── Step 5: Display expenses ──
function displayExpenses(filter = "all") {

    // Filter expenses
    // Hint: use .filter() array method
    let filtered = expenses
    if(filter !== "all") {
        filtered = expenses.filter(e => e.type === filter || e.category === filter)
    }

    // Show/hide empty state
    if (filtered.length === 0) {
        emptyState.style.display = "block"
        expenseList.innerHTML = ""
        return
    }
    emptyState.style.display = "none"

    // Render HTML
    // Hint: use .map() then .join("") — same as your Notes App!
    const html = filtered.map(e => `
        <div class="expense-item">
            <div class="expense-left">
                <div class="expense-icon">${getCategoryIcon(e.category)}</div>
                <div>
                    <div class="expense-name">${e.title}</div>
                    <div class="expense-meta">${e.category.toUpperCase()} · ${e.date}</div>
                </div>
            </div>
            <div class="expense-right">
                <div class="expense-amount ${e.type === 'income' ? 'amount-income' : 'amount-expense'}">
                    ${e.type === 'income' ? '+' : '-'} Rs. ${e.amount}
                </div>
                <button class="delete-btn" onclick="deleteExpense('${e.id}')">✕</button>
            </div>
        </div>
    `).join("")

    expenseList.innerHTML = html
}

// ── Step 6: Update summary cards ──
function updateSummary() {

    // Calculate total income
    // Hint: use .filter() then .reduce()
    const income = expenses
        .filter(e => e.type === "income")
        .reduce((sum, e) => sum + Number(e.amount), 0)

    // Calculate total expense — your turn!
    const expense =     expenses.filter(e => e.type === "expense")
    .reduce((sum, e) => sum + Number(e.amount), 0)
    // Calculate balance — your turn!
  

   
        const balance = income - expense   
    

    // Update DOM
    totalIncome.textContent = "Rs. " + income
    totalExpense.textContent = "Rs. " + expense
    totalAmount.textContent = "Rs. " + balance
}

// ── Step 7: Delete expense ──
function deleteExpense(id) {

    // Hint: use .filter() to remove the item with matching id
    expenses = expenses.filter(e=> e.id !==id)
    localStorage.setItem("expenses", JSON.stringify(expenses))
    // Save to localStorage
    

    // Refresh UI
    displayExpenses()
    updateSummary()
}

// ── Step 8: Clear all expenses ──
clearAllBtn.addEventListener("click", () => {
    if (confirm("Delete all transactions?")) {
        expenses = []
        // Save to localStorage — your turn!
          localStorage.setItem("expenses", JSON.stringify(expenses))
        displayExpenses()
        updateSummary()
    }
})

// ── Step 9: Filter buttons ──
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove("active"))
        // Add active to clicked button
        btn.classList.add("active")
        // Display with filter
        displayExpenses(btn.dataset.filter)
    })
})

// ── Helper: Get emoji for category ──
function getCategoryIcon(category) {
    const icons = {
        food: "🍔",
        transport: "🚗",
        shopping: "🛍️",
        bills: "💡",
        salary: "💼",
        other: "📦"
    }
    return icons[category] || "📦"
}

// ── Step 10: Run on page load ──
displayExpenses()
updateSummary()