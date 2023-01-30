
import fs from "node:fs"
import process from "node:process"
import { parseArgs } from "node:util"

import * as support from "./support.mjs"

async function main() {
    const options = {
        inputFolder: {
            type: 'string',
            short: 'i'
        },
        outputFile: {
            type: 'string',
            short: 'o'
        }
    }

    var args = process.argv.splice(2)
    const { values, positionals } = parseArgs({ args: args, options: options, allowPositionals: false})

    var fullpath = `${process.cwd()}/${values.inputFolder}`

    var circuit = await support.convertCircuit(fullpath)
    var jsonString = JSON.stringify(circuit.convertedObject, null, 2)

    fs.writeFileSync(values.outputFile, jsonString)
}

try {
    process.exit(await main())
}
catch(ex){
    console.error(ex.message)
    process.exit(-1)
}
