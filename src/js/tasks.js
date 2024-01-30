const swapTaskCompletedStatus = ({pk, completed}) => {
    const element = document.getElementById(pk)
    if (element) element.setAttribute("data-task-completed", completed)
}


const swapTaskPatchButton = ({element, completed}) => {
    element.setAttribute("hx-vals", `js:{completed:${!completed}}`)
    element.classList.remove("bi-arrow-repeat", "bi-check-lg")
    if (completed) {
        element.classList.add("bi-arrow-repeat")
    } else {
        element.classList.add("bi-check-lg")
    }
}


document.body.addEventListener("htmx:afterOnLoad", (event) => {
    const xhr = event.detail.xhr
    if (xhr.status !== 200) return  // do nothing if request wasn't successful

    const triggeredElement = event.detail.elt
    const action = triggeredElement.getAttribute("data-task-action")
    let response = xhr.response

    if (action === "patch" && xhr.responseURL.includes("tasks")) {
        response = JSON.parse(response)
        swapTaskPatchButton({...response, element: triggeredElement})
        swapTaskCompletedStatus(response)
    }
})
