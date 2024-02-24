var canvas1, canvas2, context1, context2;
var score = 0;
var differenceCount = 0;
var clickProcessed = false;

var differences = [
    {x1: 309, y1: 188.125, x2: 909, y2: 188.125, found: false},
    {x1: 451, y1: 201.125, x2: -149, y2: 205.125, found: false},
    {x1: 277, y1: 71.125, x2: 877, y2: 71.125, found: false},
    {x1: 143, y1: 323.125, x2: 743, y2: 323.125, found: false},
    {x1: 542, y1: 210.125, x2: 1142, y2: 210.125, found: false},
    // Add more coordinates as needed
];

window.onload = function() {
    canvas1 = document.getElementById('imageCanvas1');
    context1 = canvas1.getContext('2d');

    canvas2 = document.getElementById('imageCanvas2');
    context2 = canvas2.getContext('2d');

    canvas1.addEventListener('click', function(event) {
        checkDifference(event, canvas1, context1);
    });
    canvas2.addEventListener('click', function(event) {
        checkDifference(event, canvas2, context2);
    });

    canvas1.addEventListener('click', function() { clickProcessed = false; });
    canvas2.addEventListener('click', function() { clickProcessed = false; });

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

function checkDifference(event, canvas, context) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    differences.forEach(function(difference, index) {
        var dx = difference.x1 - x;
        var dy = difference.y1 - y;
        var distance1 = Math.sqrt(dx * dx + dy * dy);

        var dx2 = difference.x2 - x;
        var dy2 = difference.y2 - y;
        var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if ((distance1 < 20 || distance2 < 20) && !difference.found) {
            context.beginPath();
            context.arc(difference.x1, difference.y1, 20, 0, 2 * Math.PI, false);
            context.lineWidth = 3;
            context.strokeStyle = 'green';
            context.stroke();

            score += 100;
            differenceCount++;
            difference.found = true;
            clickProcessed = true;

            if (differenceCount === differences.length) {
                console.log("Congratulations! You found all the differences.");
            }

            console.log("Score: " + score);
            console.log("Differences found: " + differenceCount);

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
