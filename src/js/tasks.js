const swapTaskListCompletedStatus = ({uuid, completed}) => {
    console.debug("swap task list completed status")
    const element = document.getElementById(uuid)
    if (element) element.setAttribute("data-task-completed", completed)
}


const swapTaskDetailedCompletedStatus = ({completed}) => {
    console.debug("swap task detail completed status")
    const element = document.querySelector("h1#summary")
    if (!element) return

    if (completed) {
        const icon = document.createElement("i")
        icon.classList.add("bi", "bi-check-lg", "text-success")
        element.prepend(icon)
    } else {
        const icon = element.querySelector("i.bi.bi-check-lg")
        element.removeChild(icon)
    }
}


const updateListActionButton = (element, completed) => {
    console.debug("update list action button")
    element.classList.remove("bi-arrow-repeat", "bi-check-lg")
    if (completed) {
        element.classList.add("bi-arrow-repeat")
    } else {
        element.classList.add("bi-check-lg")
    }
}


const updateDetailActionButton = (element, completed) => {
    console.debug("update detail action button")
    element.classList.remove("btn-outline-warning", "btn-outline-success")
    if (completed) {
        element.classList.add("btn-outline-warning")
        element.textContent = "Reopen"
    } else {
        element.classList.add("btn-outline-success")
        element.textContent = "Complete"
    }
}


const swapTaskPatchButton = ({element, completed}) => {
    console.debug("swap task patch button")
    element.setAttribute("hx-vals", `js:{completed:${!completed}}`)
    if (element.matches("i[role=button]")) updateListActionButton(element, completed)
    if (element.matches("button.btn")) updateDetailActionButton(element, completed)
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
        swapTaskDetailedCompletedStatus(response)
        swapTaskListCompletedStatus(response)
    }
})
