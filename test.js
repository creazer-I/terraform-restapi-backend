function checkDifference(event) {
    var x1 = event.clientX - canvas1.getBoundingClientRect().left;
    var y1 = event.clientY - canvas1.getBoundingClientRect().top;

    var x2 = event.clientX - canvas2.getBoundingClientRect().left;
    var y2 = event.clientY - canvas2.getBoundingClientRect().top;

    var found = false;

    differences.forEach(function(difference, index) {
        var dx1 = difference.x1 - x1;
        var dy1 = difference.y1 - y1;
        var distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

        var dx2 = difference.x2 - x2;
        var dy2 = difference.y2 - y2;
        var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if ((distance1 < 20) && !difference.found && !found) {
            context1.beginPath();
            context1.arc(difference.x1, difference.y1, 20, 0, 2 * Math.PI, false);
            context1.lineWidth = 3;
            context1.strokeStyle = 'green';
            context1.stroke();

            score += 100;
            differenceCount++;
            difference.found = true;
            found = true;
        }

        if ((distance2 < 20) && !difference.found && !found) {
            context2.beginPath();
            context2.arc(difference.x2, difference.y2, 20, 0, 2 * Math.PI, false);
            context2.lineWidth = 3;
            context2.strokeStyle = 'green';
            context2.stroke();

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
