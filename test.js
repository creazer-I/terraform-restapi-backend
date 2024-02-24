window.onload = function() {
    canvas1 = document.getElementById('imageCanvas1');
    context1 = canvas1.getContext('2d');

    canvas2 = document.getElementById('imageCanvas2');
    context2 = canvas2.getContext('2d');

    canvas1.addEventListener('click', function(event) {
        checkDifference(event, canvas1, context1);
        logCoordinates(event, canvas1);
    });

    canvas2.addEventListener('click', function(event) {
        checkDifference(event, canvas2, context2);
        logCoordinates(event, canvas2);
    });

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
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;

    var found = false;

    differences.forEach(function(difference, index) {
        var dx = difference.x - x;
        var dy = difference.y - y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20 && !difference.found && !found) {
            context.beginPath();
            context.arc(difference.x, difference.y, 20, 0, 2 * Math.PI, false);
            context.lineWidth = 3;
            context.strokeStyle = 'green';
            context.stroke();

            score += 100;
            differenceCount++;
            difference.found = true;
            found = true;
        }
    });

    if (!found) {
        clickProcessed = false;
    }

    if (differenceCount === differences.length) {
        console.log("Congratulations! You found all the differences.");
    }

    console.log("Score: " + score);
    console.log("Differences found: " + differenceCount);

    document.getElementById('score').textContent = "Score: " + score;
    document.getElementById('differenceCount').textContent = "Differences found: " + differenceCount;
}

function logCoordinates(event, canvas) {
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;

    console.log("Clicked coordinates on Image: X = " + x + ", Y = " + y);
}
