/**
 * Class that enables returning multiple error.
 * Useful for cascading promise catches
 * @class
*/
class ErrorStack {
	/**
	 * @param {function} sender
	 * 	the function that send this error message
	 * @param {any} message
	 * 	the message describing the error in more detail
	 * @param {ErrorStack} [oldErrorStack = null]
	 * 	the ErrorStack from previously called lower functions
	**/
	constructor(sender, message, oldErrorStack) {
		// defaults
		oldErrorStack = oldErrorStack || null;
		//
		this.sender = sender || null;
		this.message = message || "No message";
		if (this.oldErrorStack instanceof ErrorStack) {
			// oldErrorStack is not a real ErrorStack
			// its a message from a function that does not use this concept
			// -> wrap the message
			this.oldErrorStack = new ErrorStack(null, oldErrorStack, null);
		}
		else {
			this.oldErrorStack = oldErrorStack;
		}
	}

	/**
	 * Prints the ErrorStack to the console.
	 * The output can be formatted.
	 * @param {object} [config]
	 * @param {string} [config.indentCharacter = " "]
	 * 	wich charcter should be used to indent
	 * @param {number} [config.indentBase = 0]
	 * 	characters of indent
	 * @param {number} [config.indentPerStack = 4]
	 * 	characters indenting multiplied by level of stackdepth
	**/
	print(config) {
		// apply default values
		config = config || {};
		config = {
			indentCharacter: config.indentCharacter || " ",
			indentPerStack: config.indentPerStack || 4,
			indentBase: config.indentBase || 0,
		};
		// log message to console
		let indent = "\n" + config.indentCharacter.repeat(config.indentBase);
		let indentedSender = indent + (this.sender ? this.sender.name : "anonymus function") + " : ";
		// TODO somethings wrong here with indent
		let indentedMessage = JSON.stringify(this.message);//JSON.stringify(this.message).replace("\n", indent) + "\n";
		console.error(indentedSender + indentedMessage);
		// recursive call of next deeper ErrorStack
		if (this.oldErrorStack) {
			// another error message exist
			// -> increase indent and call print
			config.indentBase += config.indentPerStack;
			this.oldErrorStack.print(config);
		}
	}
}
/**
 * Shortcut to print an error message
 * @param {*|String|Error|ErrorStack} error
 * 	can be of any type but might provide less detailed output if so
**/
ErrorStack.print = (error) => {
	new ErrorStack(null, error, null).print();
};

module.exports = ErrorStack;
