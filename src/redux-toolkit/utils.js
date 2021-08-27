export function isPlainObject(val){
    if(typeof val !== 'object' || val == null){
        return false
    }

    return Object.getPrototypeOf(val) === Object.prototype
}