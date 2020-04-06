export const register = (user) =>
    fetch("https://mysterious-scrubland-13751.herokuapp.com/register", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())


export const login = (user) =>
    fetch("https://mysterious-scrubland-13751.herokuapp.com/login", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())

export const logout = () =>
    fetch("https://mysterious-scrubland-13751.herokuapp.com/logout", {
        method: 'POST',
        credentials: "include"
    })

export const profile = () =>
    fetch("https://mysterious-scrubland-13751.herokuapp.com/profile", {
        method: 'POST',
        credentials: "include"
    }).then(response => response.json())
