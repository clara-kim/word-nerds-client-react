import {WN_API_URL} from "../common/constants.js";

export const register = (user) =>
    fetch(`${WN_API_URL}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    }).then(response => response.status === 200 ? response.json() : undefined)
        .catch(err => undefined)


export const login = (user) =>
    fetch(`${WN_API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: "include"
        }).then(response => response.status === 200 ? response.json() : undefined)
        .catch(err => undefined)

export const logout = () =>
    fetch(`${WN_API_URL}/logout`, {
        method: 'POST',
        credentials: "include"
    })

export const profile = () =>
    fetch(`${WN_API_URL}/profile`, {
        method: 'GET',
        credentials: "include"
    }).then(response => response.json())

export const updateProfile = (user) =>
    fetch(`${WN_API_URL}/api/users/${user.userId}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include"
    })
        .then(response => response.json())

export const viewProfile = (userId) =>
    fetch(`${WN_API_URL}/api/users/${userId}`, {
        method: 'GET',
        credentials: "include"
    })
        .then(response => response.json())
        .catch(err => undefined)

export const deleteUser = (userId) =>
    fetch (`${WN_API_URL}/api/users/${userId}`, {method: 'DELETE'})
        .then(response=>response.json())

export const findContentsForUser = (userId) =>
    fetch (`${WN_API_URL}/api/users/${userId}/contents`)
        .then(response => response.status === 200 ? response.json() : [])
        .catch(err => [])
