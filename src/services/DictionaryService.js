

export const getWordDetails = async(word) => {
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=64a0dba8-3f3e-4b8f-8eef-e0e6e33247ee`;
    const response = await fetch(url);
    let data = await response.json();
    return data[0];
}

export const checkWordExists = async(word) => {
    const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=64a0dba8-3f3e-4b8f-8eef-e0e6e33247ee`;
    const response = await fetch(url);
    let data = await response.json();
    if (data.length === 0) {
        return false;
    } else if ( typeof data[0] === 'string' || data[0] instanceof String ) {
        return false;
    } else {
        return true;
    }
}
