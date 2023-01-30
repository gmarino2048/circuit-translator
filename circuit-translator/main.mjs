
import fs from "node:fs"
import process from "node:process"
import { parseArgs } from "node:util"

import { Transistor } from "./components/transistor.mjs"
import * as support from "./support.mjs"

const EXPECTED_FILENAMES = {
    transNames: 'nodenames',
    wires: 'segdefs',
    support: 'support',
    transistors: 'transdefs'
}

async function main() {
}

try {
    process.exit(await main())
}
catch(ex){
    console.error(ex.message)
}
