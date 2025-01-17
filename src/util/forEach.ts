export function forEachObject(object: {}, iterator: (key: string, value: {}) => void) {
    var keys = Object.keys(object)
    keys.forEach((key) => {
        //@ts-expect-error
        iterator(key, object[key])
    })
}