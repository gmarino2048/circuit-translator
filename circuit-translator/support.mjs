
import { Transistor } from './components/transistor.mjs'

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

    var transdefs = (await import(transdefsName)).transdefs
    var transistors = []

    for(var definition of transdefs){
        var transistor = new Transistor(definition)

        if(!transistor.shouldBeIgnored){
            transistors.push(transistor)
        }
    }

    return transistors
}
