import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

const appSettings = {
  databaseURL: "https://realtime-database-90f99-default-rtdb.asia-southeast1.firebasedatabase.app/" 
}
const app = initializeApp(appSettings)
const db = getDatabase(app)
const shoppingList = ref(db, "shoppingList")

addButtonEl.addEventListener("click", function() {
  let inputValue = inputFieldEl.value

  push(shoppingList, inputValue)

  console.log(inputValue + " is added to database")
  shoppingListEl.innerHTML += `<li>${inputValue}</li>` 
  
  inputFieldEl.value = ""
  console.log("Clear input-field")
})
