
import process from "node:process"
import { parseArgs } from "node:util"

import * as support from "./support.mjs"

async function main() {
    const folderName = '../6502'
    var transistorList = await support.convertTransistors(folderName)

    var transistorObjs = []
    for(var transistor of transistorList) {
        transistorObjs.push(transistor.convertedObject)
    }

    // console.log(JSON.stringify(transistorObjs, null, 4))

    var wireList = await support.convertWires(folderName, transistorList)

    var wireObjs = []
    for(var wire of wireList) {
        wireObjs.push(wire.convertedObject)
    }

    // console.log(JSON.stringify(wireObjs, null, 4))
}

try {
    process.exit(await main())
}
catch(ex){
    console.error(ex.message)
    process.exit(-1)
}
