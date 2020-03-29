// https://cors-anywhere.herokuapp.com/ is a CORS proxy for getting around
// "No Access-Control-Allow-Origin header" problems
// see https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
export const getSearchResults = async(searchQuery) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `http://api.datamuse.com/words?sp=${searchQuery}*&md=d`
    const response = await fetch (proxyurl + url)
    // let searchResults = await response.json();
    return await response.json()
}
