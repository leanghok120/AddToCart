import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

const appSettings = {
  databaseURL: "https://realtime-database-90f99-default-rtdb.asia-southeast1.firebasedatabase.app/" 
}
const app = initializeApp(appSettings)
const db = getDatabase(app)
const shoppingListInDB = ref(db, "shoppingList")


addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value

  push(shoppingListInDB, inputValue)

  clearInputField()
})

onValue(shoppingListInDB, function(snapshot) {
  let shoppingsArray = Object.entries(snapshot.val())

  clearShoppingList()


  for (let i = 0; i < shoppingsArray.length; i++) {
    let currentItem = shoppingsArray[i]

    addItemToCart(currentItem)
  }
})

function clearShoppingList() {
  shoppingListEl.innerHTML = ""
}

function addItemToCart(item) {
  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement("li")

  newEl.textContent = itemValue

  // finish implementing a delete item component (try not to look at the srimba)
  newEl.addEventListener("click", function() {
    let itemLocationInDB = ref(db, `shoppingList/${itemID}`)

    remove(itemLocationInDB)
  })

  shoppingListEl.append(newEl)
}

function clearInputField() {
  inputFieldEl.value = "" 
}
