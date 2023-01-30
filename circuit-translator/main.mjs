
import process from "node:process"
import { parseArgs } from "node:util"

import * as support from "./support.mjs"

async function main() {
    const folderName = '../6502'
    var circuit = await support.convertCircuit(folderName)

    console.log(JSON.stringify(circuit.convertedObject))
}

try {
    process.exit(await main())
}
catch(ex){
    console.error(ex.message)
    process.exit(-1)
}
