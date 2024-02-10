const swapTaskListCompletedStatus = ({uuid, completed}) => {
    const element = document.getElementById(uuid)
    if (element) element.setAttribute("data-task-completed", completed)
}


const swapTaskDetailedCompletedStatus = ({completed}) => {
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
    element.classList.remove("bi-arrow-repeat", "bi-check-lg")
    if (completed) {
        element.classList.add("bi-arrow-repeat")
    } else {
        element.classList.add("bi-check-lg")
    }
}


const updateDetailActionButton = (element, completed) => {
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
    element.setAttribute("hx-vals", `js:{completed:${!completed}}`)
    if (element.matches("i[role=button]")) updateListActionButton(element, completed)
    if (element.matches("button.btn")) updateDetailActionButton(element, completed)
}


document.body.addEventListener("htmx:afterOnLoad", (event) => {
    const xhr = event.detail.xhr
    if (xhr.status < 200 || xhr.status > 299) {
        messages.show("Something went wrong", "error")
        return
    }

    // noinspection JSUnresolvedReference
    const method = event.detail.requestConfig.verb
    const triggeredElement = event.detail.elt
    let response = xhr.response

    if (method === "patch" && xhr.responseURL.includes("tasks")) {
        response = JSON.parse(response)
        swapTaskPatchButton({...response, element: triggeredElement})
        swapTaskDetailedCompletedStatus(response)
        swapTaskListCompletedStatus(response)
    }

    if (method === "delete" && xhr.responseURL.includes("tasks")) {
        event.detail.target.remove()
    }
})
