export const register = (user) =>
    fetch("https://polar-ravine-37796.herokuapp.com/register", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())


export const login = (user) => {
    fetch("https://polar-ravine-37796.herokuapp.com/login", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.json())
}

export const logout = () =>
    fetch("https://polar-ravine-37796.herokuapp.com/logout", {
        method: 'POST',
        credentials: "include"
    })

export const profile = () =>
    fetch("https://polar-ravine-37796.herokuapp.com/profile", {
        method: 'GET',
        credentials: "include"
    }).then(response => response.json())
