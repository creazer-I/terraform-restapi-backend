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

window.onload = function() {
    // Assign canvas1 and canvas2 inside the function
    canvas1 = document.getElementById('imageCanvas1');
    context1 = canvas1.getContext('2d');

    canvas2 = document.getElementById('imageCanvas2');
    context2 = canvas2.getContext('2d');

    // Add event listeners to both canvases
    canvas1.addEventListener('click', checkDifference);
    canvas2.addEventListener('click', checkDifference);

    canvas1.addEventListener('click', function() { clickProcessed = false; });
    canvas2.addEventListener('click', function() { clickProcessed = false; });
    
    // Add event listeners to both canvases
    canvas1.addEventListener('click', logCoordinates);
    canvas2.addEventListener('click', logCoordinates);

    var img1 = new Image();
    var img2 = new Image();

    img1.onload = function() {
        canvas1.width = img1.width;
        canvas1.height = img1.height;
        context1.drawImage(img1, 0, 0, img1.width, img1.height);
    };

    img2.onload = function() {
        canvas2.width = img2.width;
        canvas2.height = img2.height;
        context2.drawImage(img2, 0, 0, img2.width, img2.height);
    };

    img1.src = './images/different-Image-collection1/OfficePuzzle--1.png';
    img2.src = '/app/images/different-Image-collection1/OfficePuzzle--2.png';

};

function checkDifference(event) {
    var x1 = event.clientX - canvas1.getBoundingClientRect().left;
    var y1 = event.clientY - canvas1.getBoundingClientRect().top;

    var x2 = event.clientX - canvas2.getBoundingClientRect().left;
    var y2 = event.clientY - canvas2.getBoundingClientRect().top;

    differences.forEach(function(difference, index) {
        // Check coordinates for both images
        var dx1 = difference.x - x1;
        var dy1 = difference.y - y1;
        var distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

        var dx2 = difference.x - x2;
        var dy2 = difference.y - y2;
        var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if((distance1 < 20 || distance2 < 20) && !difference.found) { // Adjust as needed
            [context1, context2].forEach(function(context) {
                context.beginPath();
                context.arc(difference.x, difference.y, 20, 0, 2 * Math.PI, false);
                context.lineWidth = 3;
                context.strokeStyle = 'green';
                context.stroke();
            });


            // Increment score and differenceCount
            score += 100;
            differenceCount++;

            // Mark the difference as found
            difference.found = true;

            clickProcessed = true;

            // Check if all differences have been found
            if (differenceCount === 5) {
                console.log("Congratulations! You found all the differences.");
            }

            // Log the current score and difference count
            console.log("Score: " + score);
            console.log("Differences found: " + differenceCount);

            // Update score and difference count display
            document.getElementById('score').textContent = "Score: " + score;
            document.getElementById('differenceCount').textContent = "Differences found: " + differenceCount;

        }
    });
}

function logCoordinates(event) {
    var x1 = event.clientX - canvas1.getBoundingClientRect().left;
    var y1 = event.clientY - canvas1.getBoundingClientRect().top;

    var x2 = event.clientX - canvas2.getBoundingClientRect().left;
    var y2 = event.clientY - canvas2.getBoundingClientRect().top;

    console.log("Clicked coordinates on Image 1: X = " + x1 + ", Y = " + y1);
    console.log("Clicked coordinates on Image 2: X = " + x2 + ", Y = " + y2);
}
