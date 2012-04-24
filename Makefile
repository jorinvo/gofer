default:
	cat src/*.js >> build/gofer.js
	uglifyjs --overwrite build/gofer.js