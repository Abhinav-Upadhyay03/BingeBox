export const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
}

export const validatePassword = (password) => {
    return password.length >= 8
}