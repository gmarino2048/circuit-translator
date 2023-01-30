# Original Circuit Definition Repository

This folder contains the original circuit definitions from the original 6502 library.
These will need to be updated to work with the more modern circuit simulator program.
This folder also contains the conversion scripts needed to reformat all of the transistors and wires into the new JSON spec.

## Directions

This tool will automatically convert the CPU definitions provided here, just use the following syntax to perform the conversion

```sh
node circuit-translator -i 6502 -o 6502.json
```

You can of course swap the 6502 processor for the 6800 if desired. This should generate a JSON format compatible with the circuit-simulator repository.

## Transistor Definition Format

The transistor definitions are provided in an array called `transdefs`, where each entry looks something like:

```js
['t1',1646,13,663,[560,721,2656,2730],[415,415,11,5,4566],false]
```

This can be difficult to parse, so the format for each entry is laid out below:

0. Transistor Name
1. Gate Wire Number
2. Source Wire Number
3. Drain Wire Number
4. Bounding Box
5. *Unknown*
6. *(Optional)* Weak Transistor (should be ignored)

## Wire Definition format

The wire definitions are provided in an array called `segdefs`, where each entry looks somthing like:

```js
[0,'+',1,5391,8260,5391,8216,5357,8216,5357,8260]
```

This can be difficult to parse, so the format is laid out below:

0. Wire ID
1. Pulled Status (`+` indicates wire is pullup, `-` indicates wire is not pulled)
2. Color (not important)
3. Posiitons (not important)
