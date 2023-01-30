
// This module inverts the nodenames definition so that the lookup
// for finding transistor names is faster

export function invertNodeNames(nameLookup) {
    var invertedNames = {}

    for(var name in nameLookup) {
        var value = nameLookup[name]
        invertedNames[value] = name
    }

    return invertedNames
}
