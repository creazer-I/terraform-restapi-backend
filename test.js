// Define canvas1, canvas2, context1, and context2 at the global scope
var canvas1, canvas2, context1, context2;
var score = 0;
var differenceCount = 0;
var clickProcessed = false;

// Array to store the coordinates of the differences
var differences = [
    // 1st differnce
    {x: 309, y: 188.125, found: false}, // Coordinates from Image 2
    {x: 909, y: 188.125, found: false},  // Coordinates from Image 1

    // 2nd differnce
    {x: 451, y: 201.125, found: false},
    {x: -149, y: 205.125, found: false},

    // 3rd difference
    {x: 277, y: 71.125, found: false},
    {x: 877, y: 71.125, found: false},

    // 4th difference
    {x: 143, y: 323.125, found: false},
    {x: 743, y: 323.125, found: false},
    
    // 5th difference
    {x: 542, y: 210.125, found: false},
    {x: 1142, y: 210.125, found: false},

    // Add more coordinates as needed
];
