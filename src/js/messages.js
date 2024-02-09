document.addEventListener("DOMContentLoaded", () => {
    const toasts = document.querySelectorAll(".toast")
    toasts.forEach(toast => {
        let instance = bootstrap.Toast.getOrCreateInstance(toast, {autohide: false})
        instance.show()
    })
})
