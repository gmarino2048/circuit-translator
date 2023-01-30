
export const WirePulled = {
    high: 'HIGH',
    none: 'NONE'
}

export class WireRender {

    constructor(color, positions) {
        this.color = color
        this.positions = positions
    }

}

export class Wire {

    constructor(defArray, wireNames, transistorList) {
        if(!(defArray instanceof Array)) {
            throw TypeError("Expected array of definitions to Transistor constructor.")
        }

        if(defArray.length < 5) {
            throw RangeError("Expected an array of at least 5 to create Transistor.")
        }

        this.id = defArray[0]               // Wire ID

        // Calculate the wire pulled state from the provided
        // character (+ = high, - = not pulled)
        var pulledStatus = defArray[1]
        if(pulledStatus == '+') {
            this.pulled = WirePulled.high
        }
        if(pulledStatus == '-') {
            this.pulled = WirePulled.none
        }

        // Wire can contain multiple names
        this.name = null
        this.otherNames = []

        for(var name of wireNames) {
            this.addName(name)
        }

        // Wire can contain multiple rendered lines
        this.lines = []
        this.lines.push(new WireRender(defArray[2], defArray.slice(3)))

        // These fields are required
        this.controlTransistors = null
        this.gateTransistors = null

        this.addTransistors(transistorList)
    }

    get convertedObject() {
        if(!(this.controlTransistors && this.gateTransistors)) {
            throw EvalError('Control and Gate Transistor Values Required')
        }

        var object = {
            id: this.id,
            pulled: this.pulled,
            ctrl_transistors: this.controlTransistors,
            gate_transistors: this.gateTransistors,
            lines: this.lines
        }

        if(this.name) {
            object['name'] = this.name
        }

        if(this.otherNames.length > 0) {
            object['alternate_names'] = this.otherNames
        }

        return object
    }

    addName(name) {
        if(!this.name){
            this.name = name
        }
        else {
            this.otherNames.push(name)
        }
    }

    addLine(color, positions) {
        this.lines.push(new WireRender(color, positions))
    }

    addTransistors(transistorList) {
        var controlTransistors = []
        var gateTransistors = []

        for(var transistor of transistorList) {
            if(transistor.shouldBeIgnored){
                continue
            }

            if(this.id == transistor.gateWire){
                gateTransistors.push(transistor.id)
            }

            // This logic handles potential duplicates by not re-adding drain
            // if wire is also listed as source for some reason.
            // This would be bad circuit design, but it could be possible.
            if(this.id == transistor.sourceWire){
                controlTransistors.push(transistor.id)
            }
            else if(this.id == transistor.drainWire) {
                controlTransistors.push(transistor.id)
            }
        }

        this.controlTransistors = controlTransistors
        this.gateTransistors = gateTransistors
    }

}
