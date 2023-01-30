
export class Circuit {

    constructor(name, wires, transistors) {
        this.name = name
        this.wires = wires,
        this.transistors = transistors
    }

    get convertedObject() {
        var wireObjects = this.wires.map(wire => wire.convertedObject)
        var transistorObjects = this.transistors.map(transistor => transistor.convertedObject)

        return {
            name: this.name,
            wires: wireObjects,
            transistors: transistorObjects
        }
    }

}
