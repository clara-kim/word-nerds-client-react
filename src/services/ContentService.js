import {WN_API_URL} from "../common/constants.js";

export const findQuotesForWord = (word) =>
    fetch(`${WN_API_URL}/api/words/${word}/quotations`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(response => response.status === 200 ? response.json() : [])
        .catch(err => [])

export const findSentencesForWord = (word) =>
    fetch(`${WN_API_URL}/api/words/${word}/quotations`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(response => response.status === 200 ? response.json() : [])
        .catch(err => [])

export const findCommentsForWord = (word) =>
    fetch(`${WN_API_URL}/api/words/${word}/quotations`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(response => response.status === 200 ? response.json() : [])
        .catch(err => [])

export const findDefinitionsForWord = (word) =>
    fetch(`${WN_API_URL}/api/words/${word}/quotations`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(response => response.status === 200 ? response.json() : [])
        .catch(err => [])

export const deleteContent = (contentId) =>
    fetch(`${WN_API_URL}/contents/${contentId}`, {
        method: "DELETE"
    })
        .then(response => response.json());

export const createContent =  (newContent, userId, word) =>
    fetch(`${WN_API_URL}/api/users/${userId}/words/${word}/contents`, {
        method: "POST",
        body: JSON.stringify(newContent),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json());

export const updateContent = async (contentId, content) => {
    const response = await fetch(`${WN_API_URL}/api/contents/${contentId}`, {
        method: 'PUT',
        body: JSON.stringify(content),
        headers: {
            'content-type': 'application/json'
        }
    })
    return await response.json()
}

export default {
    deleteContent,
    createContent,
    updateContent,
    findQuotesForWord,
    findSentencesForWord,
    findCommentsForWord,
    findDefinitionsForWord
}
