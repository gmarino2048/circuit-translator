
const EXPECTED_FILENAMES = {
    transNames: 'nodenames',
    wires: 'segdefs',
    support: 'support',
    transistors: 'transdefs'
}

export function findNames(id, namedefs) {
    var names = []
    for(var key in namedefs) {
        if(namedefs[key] == id) {
            names.push(key)
        }
    }
    return names
}

export async function convertTransistors(folderName) {
    var transdefsName = `${folderName}/${EXPECTED_FILENAMES.transistors}.mjs`
    var nodenamesName = `${folderName}/${EXPECTED_FILENAMES.transNames}.mjs`

    var transdefs = (await import(transdefsName)).transdefs
    var nodenames = (await import(nodenamesName)).nodenames

    var transistors = []

    transdefs.forEach(definition => {
        var transistor = new Transistor(definition)
        var transistorNames = findNames(transistor.id, nodenames)

        for(var name of transistorNames) {
            transistor.addName(name)
        }

        transistors.push(transistor)
    })

    return transistors
}
