const currentlyplaying = require("./currentlyplaying.js")
const info = require("./info.js")
const pause = require("./pause.js")
const play = require("./play.js")
const queue = require("./queue.js")
const quit = require("./quit.js")
const resume = require("./resume.js")
const shuffle = require("./shuffle.js")
const skip = require("./skip.js")
const skipto = require("./skipto.js")
const looptrack = require("./looptrack.js")

module.exports = [currentlyplaying, info, pause, play, queue, quit, resume, shuffle, skip, skipto, looptrack]