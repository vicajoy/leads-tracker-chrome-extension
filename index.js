let myLeads = []

const inputButton = document.getElementById("input-btn")
const inputElement = document.getElementById("input-el")
const ulElement = document.getElementById("ul-el")
const deleteButton = document.getElementById("delete-btn")
const saveTabButton = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse((localStorage.getItem("myLeads")))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

inputButton.addEventListener("click", function () {
    myLeads.push(inputElement.value)
    inputElement.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})

saveTabButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteButton.addEventListener("click", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
            </li>
        `
    }
    ulElement.innerHTML = listItems
}
