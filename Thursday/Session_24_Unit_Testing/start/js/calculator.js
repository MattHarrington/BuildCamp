var Calculator = (function() {
	function Calculator() {}

	Calculator.prototype.add = function (operand1, operand2) {
		return operand1 + operand2;
	};

	return Calculator;
})();