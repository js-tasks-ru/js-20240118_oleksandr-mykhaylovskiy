/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
    if(size === undefined) return string;

    const data = {
        counter: 0,
        currentLetter: null,
        res: '',
    }

    let { counter, currentLetter, res } = data;

    for(let i=0; i<string.length; i++){
        if(res.length>0 && currentLetter !== string[i]){
            counter = 0;
        }
        if(size>counter){
            currentLetter = string[i];
            counter +=1;
            res += string[i];
        }
    }

    return res;

}
