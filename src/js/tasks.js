const swapTaskCompletedStatus = ({pk, completed}) => {
    const element = document.getElementById(pk)
    if (element) element.setAttribute("data-task-completed", completed)
}


const swapTaskPatchButton = ({element, completed}) => {
    element.setAttribute("hx-vals", `js:{completed:${!completed}}`)
    element.classList = ["bi"] // clean class list
    if (completed) {
        element.classList.add("bi-arrow-repeat")
    } else {
        element.classList.add("bi-check-lg")
    }
}


document.body.addEventListener("htmx:afterOnLoad", (event) => {
    const xhr = event.detail.xhr
    const response = JSON.parse(xhr.response)
    const triggeredElement = event.detail.elt
    const action = triggeredElement.getAttribute("data-task-action")

    if (action === "patch" && xhr.responseURL.includes("tasks")) {
        swapTaskPatchButton({...response, element: triggeredElement})
        swapTaskCompletedStatus(response)
    }
})
