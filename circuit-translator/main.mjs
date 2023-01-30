
import process from "node:process"
import { parseArgs } from "node:util"

import { Transistor } from "./components/transistor.mjs"
import * as NameSupport from "./support/names.mjs"

const EXPECTED_FILENAMES = [
    'nodenames',
    'segdefs',
    'support',
    'transdefs'
]

function main() {
    
}

try {
    process.exit(main())
}
catch(ex){
    console.error(ex.message)
}
