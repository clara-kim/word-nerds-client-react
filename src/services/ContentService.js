import {WN_API_URL} from "../common/constants.js";

export const findQuotesForWord = (word) =>
    fetch(`${WN_API_URL}/api/words/${word}/quotations`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        },
    })
        .then(response => response.json())

// export const deleteModule = (moduleId) =>
//     fetch(`${PROF_API_URL}/modules/${moduleId}`, {
//         method: "DELETE"
//     })
//         .then(response => response.json())
//
// export const findAllModules = () =>
//     fetch(`${PROF_API_URL}/modules`)
//         .then(response => response.json())
//
// export const createContent =  (newContent, userId, word) =>
//     fetch(`${WN_API_URL}/api/contents`, {
//         method: "POST",
//         body: JSON.stringify(newContent, userId, word), //TODO SEPARATE OUT EACH?
//         headers: {
//             'content-type': 'application/json'
//         }
//     })
//         .then(response => response.json())
//
// export const updateModule = async (moduleId, module) => {
//     const response = await fetch(`${PROF_API_URL}/modules/${moduleId}`, {
//         method: 'PUT',
//         body: JSON.stringify(module),
//         headers: {
//             'content-type': 'application/json'
//         }
//     })
//     return await response.json()
// }

export default {
    // deleteModule,
    findQuotesForWord,
    // createModule,
    // updateModule
}
