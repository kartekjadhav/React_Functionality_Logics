export const fileHeirarchy = [
    {
        id: 1,
        name: "Folder1",
        isFolder: true,
        children: [
            {
                id: 5,
                name: "Folder11",
                isFolder: true,
                children: []   
            },

            {
                id: 6,
                name: "Folder12",
                isFolder: true,
                children: [
                    {
                        id: 7,
                        name: "file2",
                        isFolder: false,
                        children: []
                    }
                ]   
            }
        ]   
    },

    {
        id: 2,
        name: "Folder2",
        isFolder: true,
        children: []   
    },

    {
        id: 3,
        name: "File1",
        isFolder: false,
        children: []   
    },

    {
        id: 4,
        name: "Folder4",
        isFolder: true,
        children: [
            {
                id: 8,
                name: "file8",
                isFolder: false,
                children: []   
            }
        ]   
    }
]