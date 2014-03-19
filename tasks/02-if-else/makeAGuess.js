var correctAnswerNum = 2;
var userInput = prompt("Угадайте число! Введите целое число от 1 до 10, и узнаете отгадали ли вы его");

if (userInput !== null) {
	if (isNaN(+userInput)) {
		console.log("Вы ввели не число!");
	// verify if entered number type is integer
	} else if (parseInt(userInput, 10) !== parseFloat(userInput)) {
		console.log("Вы ввели не целое число!");
	} else if ((parseInt(userInput, 10) < 1) || (parseInt(userInput, 10) > 10)) {
		console.log("Введеное вами число находится за пределами диапазона!");
	} else if (parseInt(userInput, 10) === correctAnswerNum) {
		console.log("Ура! Вы угадали загаданное число! )");
	} else {
		console.log("Вы не угадали загаданное число (");
	}
} else {
	console.log("Нет, так нет )");
}