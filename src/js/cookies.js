export const getCookieValue = name => {
    if (!document.cookie) return null

    let cookies = document.cookie.split(";")
    for (let cookie of cookies) {
        let [cookie_name, cookie_value] = cookie.split("=")
        if (cookie_name.toLowerCase() === name.toLowerCase()) return cookie_value
    }
    return null
}
