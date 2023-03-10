
export class Transistor {

    constructor(defArray) {
        if(!(defArray instanceof Array)) {
            throw TypeError("Expected array of definitions to Transistor constructor.")
        }

        if(defArray.length < 5) {
            throw RangeError("Expected an array of at least 5 to create Transistor.")
        }

        // The "transdefs" list doesn't actually have a numeric ID, so we must
        // convert it from the string value to an actual number
        this._id = null
        this._idstr = defArray[0]

        this.name = defArray[0]
        this.gateWire = defArray[1]         // Gate
        this.sourceWire = defArray[2]       // Source
        this.drainWire = defArray[3]        // Drain

        this.boundingBox = defArray[4]      // Display Bounding Box

        // This next bit checks for a weak transistor, which is a non-logical
        // transistor used for other purposes
        if(defArray.length == 7) {
            this.shouldBeIgnored = defArray[6]
        }
        else {
            this.shouldBeIgnored = false
        }
    }

    get id() {
        if(this._id != null) {
            return this._id
        }

        const re = /t[0-9]+/
        var found = this._idstr.match(re)

        if(found.length != 1) {
            throw EvalError(`ID value ${this._idstr} not in expected format 't???'`)
        }

        var numString = found[0].slice(1)
        var value = Number(numString)

        if(value == NaN) {
            throw EvalError(`Could not parse number from ${numString}`)
        }

        this._id = value
        return value
    }

    get convertedObject() {
        var object = {
            id: this.id,
            type: 'NMOS',
            gate_wire: this.gateWire,
            source_wire: this.sourceWire,
            drain_wire: this.drainWire,
            bounding_box: this.boundingBox
        }

        if(this.name){
            object['name'] = this.name
        }

        return object
    }

}
