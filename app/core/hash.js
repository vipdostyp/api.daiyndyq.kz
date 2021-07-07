module.exports = (number) => {
    let chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let code  = ''
    let clen  = chars.length - 1

	while(code.length < number) {
		code = code + chars[Math.floor(Math.random() * chars.length)]		
	}

	return code
}