function checkDifference(event, canvasId) {
    var x, y;
    if (canvasId === 'imageCanvas1') {
        x = event.clientX - canvas1.getBoundingClientRect().left;
        y = event.clientY - canvas1.getBoundingClientRect().top;
    } else if (canvasId === 'imageCanvas2') {
        x = event.clientX - canvas2.getBoundingClientRect().left;
        y = event.clientY - canvas2.getBoundingClientRect().top;
    }

    var found = false;

    differences.forEach(function(difference, index) {
        var dx1 = difference.x1 - x;
        var dy1 = difference.y1 - y;
        var distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);

        var dx2 = difference.x2 - x;
        var dy2 = difference.y2 - y;
        var distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

        if ((distance1 < 20 || distance2 < 20) && !difference.found && !found) {
            // Draw circle on first canvas
            context1.beginPath();
            context1.arc(difference.x1, difference.y1, 20, 0, 2 * Math.PI, false);
            context1.lineWidth = 3;
            context1.strokeStyle = 'green';
            context1.stroke();

            // Draw circle on second canvas
            context2.beginPath();
            context2.arc(x, y, 20, 0, 2 * Math.PI, false); // Use x and y instead of difference.x2 and difference.y2
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
        // Reduce one life if the difference was not found
        lives--;
        if (lives <= 0) {
            // No lives left, end the game
            endGame("You ran out of lives! Thank you for participating.");
            return; // Exit the function to prevent further execution
        }
    }

    if (differenceCount === differences.length) {
        // All differences found, end the game
        endGame("Congratulations! You found all the differences. Thank you for participating.");
        return; // Exit the function to prevent further execution
    }

    console.log("Score: " + score);
    console.log("Differences found: " + differenceCount);
    console.log("Lives: " + lives);

    document.getElementById('score').textContent = "Score: " + score;
    document.getElementById('differenceCount').textContent = "Differences found: " + differenceCount;
    document.getElementById('lives').textContent = "Lives: " + lives;
}
