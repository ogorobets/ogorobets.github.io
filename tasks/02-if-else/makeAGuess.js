var correctAnswerNum = 2;
var userInput = prompt("Try to guess a number! Please enter an integer from 1 to 10. Then you'll find out whether your answer is correct.");

if (userInput !== null) {
	if (isNaN(+userInput)) {
		console.log("You entered not a number!");
	// verify if entered number type is integer
	} else if (parseInt(userInput, 10) !== parseFloat(userInput)) {
		console.log("You entered not an integer!");
	} else if ((parseInt(userInput, 10) < 1) || (parseInt(userInput, 10) > 10)) {
		console.log("You entered number that is out of the range!");
	} else if (parseInt(userInput, 10) === correctAnswerNum) {
		console.log("Hurray! You guessed the correct answer! )");
	} else {
		console.log("You haven't guessed the correct answer (");
	}
} else {
	console.log("Don't want to play the game now? Try next time )");
}