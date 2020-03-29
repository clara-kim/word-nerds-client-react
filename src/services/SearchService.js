// https://cors-anywhere.herokuapp.com/ is a CORS proxy for getting around
// "No Access-Control-Allow-Origin header" problems
// see https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141
export const getSearchResults = async(searchQuery) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `http://api.datamuse.com/words?sp=${searchQuery}*&md=d`;
    const response = await fetch (proxyurl + url);
    let searchResults = await response.json();

    /*
    For the time being, I filtered out words that do not have a definition in the DataMuse API
    in hopes that incorrect words are weeded out.
     */
    let filtered = [];
    for (const res in searchResults) {
        let wd = searchResults[res]
        if (wd.defs !== undefined) {
            filtered.push(wd.word)
        }
    }
    console.log(searchResults);
    console.log(filtered);
    return filtered;
}
