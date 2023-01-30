
import fs from "node:fs"
import process from "node:process"
import { parseArgs } from "node:util"

import * as support from "./support.mjs"

async function main() {
    const folderName = '../6502'
    var transistorList = await support.convertTransistors(folderName)
}

try {
    process.exit(await main())
}
catch(ex){
    console.error(ex.message)
}
