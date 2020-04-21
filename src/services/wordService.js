import {WN_API_URL} from "../common/constants.js";

export const getDislikeNumberForWord = (word) =>
    fetch(`${WN_API_URL}/api/words/${word}/dislikes`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(response => response.status === 200 ? response.json() : 0)
        .catch(err => 0)

export const getLikeNumberForWord = (word) =>
    fetch(`${WN_API_URL}/api/words/${word}/likes`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(response => response.status === 200 ? response.json() : 0)
        .catch(err => 0)
