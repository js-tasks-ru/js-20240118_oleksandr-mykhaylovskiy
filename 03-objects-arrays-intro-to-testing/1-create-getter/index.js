/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const parsedKeys = path.split('.')

    return function step(obj, keys = [...parsedKeys]) {
        if (!keys.length) {
            return obj
        }

        const key = keys.shift()

        if (Object.hasOwn(obj, key)) {
            return step(obj[key], keys)
        } 
    }
}
