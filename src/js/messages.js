const createMessageElement = (message, messageClass = "") => {
    const container = document.createElement("div")
    container.classList.add("toast", "align-items-center", messageClass)
    const wrapper = document.createElement("div")
    wrapper.classList.add("d-flex")
    const body = document.createElement("div")
    body.classList.add("toast-body")
    body.textContent = message

    wrapper.appendChild(body)
    container.appendChild(wrapper)

    return container
}


export const show = (message, category = "") => {
    const container = document.querySelector(".toast-container")
    let toast = createMessageElement(message, category)
    container.appendChild(toast)
    toast = bootstrap.Toast.getOrCreateInstance(toast, {"delay": 5000})
    toast.show()
}

document.addEventListener("DOMContentLoaded", () => {
    const toasts = document.querySelectorAll(".toast")
    toasts.forEach(toast => {
        let instance = bootstrap.Toast.getOrCreateInstance(toast, {autohide: false})
        instance.show()
    })
})
