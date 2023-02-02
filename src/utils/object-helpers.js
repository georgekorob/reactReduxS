export const updateObjectsInArray = (items, id, objPropName, newObjProps) => {
    return items.map(u => {
        if (u[objPropName] === id) return {...u, ...newObjProps};
        return u;
    })
}