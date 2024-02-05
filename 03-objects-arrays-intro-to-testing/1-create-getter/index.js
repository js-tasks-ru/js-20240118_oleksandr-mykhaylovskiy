/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const parsedKeys = path.split('.')

    let result

    return function step(obj, keys = [...parsedKeys]){
        if(!keys.length){
            result = obj;
            return result;
        }

        const key = keys.shift();

        if (Object.hasOwn(obj, key)){
            step(obj[key], keys);
        }

        return result;
    }
}
