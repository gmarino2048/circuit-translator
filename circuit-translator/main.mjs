
import process from "node:process"
import { parseArgs } from "node:util"

import * as support from "./support.mjs"

async function main() {
    const folderName = '../6800'
    var transistorList = await support.convertTransistors(folderName)
    var transistorObjs = []

    for(var transistor of transistorList) {
        transistorObjs.push(transistor.convertedObject)
    }

    console.log(JSON.stringify(transistorObjs, null, 4))
}

try {
    process.exit(await main())
}
catch(ex){
    console.error(ex.message)
    process.exit(-1)
}
