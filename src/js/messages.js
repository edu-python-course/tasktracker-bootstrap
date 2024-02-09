document.addEventListener("DOMContentLoaded", () => {
    // collect toasts elements
    const toasts = document.querySelectorAll(".toast")
    toasts.forEach(toast => {
        new bootstrap.Toast(toast) // initialize toast
        let instance = bootstrap.Toast.getInstance(toast)
        instance.show()
    })
})
