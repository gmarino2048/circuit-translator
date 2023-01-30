
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

        this.name = null
        this.gateWire = defArray[1]         // Gate
        this.sourceWire = defArray[2]       // Source
        this.drainWire = defArray[3]        // Drain

        this.boundingBox = defArray[4]      // Display Bounding Box
        this.otherNames = []

        // This next bit checks for a weak transistor, which is a non-logical
        // transistor used for other purposes
        if(defArray.length == 7) {
            this.shouldBeIgnored = defArray[6]
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

}
