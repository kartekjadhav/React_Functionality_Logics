import { v4 as uuid4 } from 'uuid';

export function addToHierarchy (data, parentid, name, isFolder) {
    if (!Array.isArray(data)) throw TypeError('Array should be passed.')

    for (let i=0; i<data.length; i++) {
        if (data[i].id === parentid) {
            data[i].children.push({
                id: uuid4(),
                name: name,
                isFolder: isFolder,
                children: []
            });
            return [true, data];
        }
        else {
            let [added, responseData] = addToHierarchy(data[i].children, parentid, name, isFolder)
            if (added) {
                data[i].children = responseData;
                return [true, data]
            }
        }
    }

    return [false, data];
}