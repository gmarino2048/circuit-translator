
import { Circuit } from './components/circuit.mjs'
import { Transistor } from './components/transistor.mjs'
import { Wire, WireSpecial } from './components/wire.mjs'

const EXPECTED_FILENAMES = {
    wireNames: 'nodenames',
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

export async function convertWires(folderName, transistorList){
    var segdefsName = `${folderName}/${EXPECTED_FILENAMES.wires}.mjs`
    var nodenamesName = `${folderName}/${EXPECTED_FILENAMES.wireNames}.mjs`

    var segdefs = (await import(segdefsName)).segdefs
    var nodenames = (await import(nodenamesName)).nodenames

    var wires = {}
    for(var definition of segdefs){
        var wireId = definition[0].toString()

        if(wireId in wires){
            wires[wireId].addLine(definition[2], definition.slice(3))
        }
        else {
            var wireNames = findNames(wireId, nodenames)
            wires[wireId] = new Wire(definition, wireNames, transistorList)
        }
    }

    var wireList = []
    for(var id in wires) {
        wireList.push(wires[id])
    }

    return wireList
}

export async function convertCircuit(folderName) {
    var transistorList = await convertTransistors(folderName)
    var wireList = convertWires(folderName, transistorList)

    // Get the support file for some additional info
    var supportName = `${folderName}/${EXPECTED_FILENAMES.support}.mjs`
    var support = await import(supportName)

    // Update all special wires accordingly
    wireList = await wireList
    var gndWireIndex = wireList.findIndex(wire => wire.id == support.ngnd)
    var vccWireIndex = wireList.findIndex(wire => wire.id == support.npwr)

    if(gndWireIndex > -1){
        wireList[gndWireIndex].special = WireSpecial.gnd
    }
    if(vccWireIndex > -1){
        wireList[vccWireIndex].special = WireSpecial.vcc
    }

    // Get the chip name from the support file
    var chipname = support.chipname

    return new Circuit(chipname, wireList, transistorList)
}
