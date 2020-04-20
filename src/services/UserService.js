export const register = (user) =>
    fetch("https://polar-ravine-37796.herokuapp.com/register", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.status === 200 ? response.json() : undefined)
        .catch(err => undefined)


export const login = (user) =>
    fetch("https://polar-ravine-37796.herokuapp.com/login", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: "include"
        }).then(response => response.status === 200 ? response.json() : undefined)
        .catch(err => undefined)

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

export const updateProfile = (user) =>
    fetch(`https://polar-ravine-37796.herokuapp.com/api/users/${user.userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    })
        .then(response => response.json())

export const viewProfile = (userId) =>
    fetch(`https://polar-ravine-37796.herokuapp.com/api/users/${userId}`, {
        method: 'GET',
        credentials: "include"
    })
        .then(response => response.json())
        .catch(err => undefined)
