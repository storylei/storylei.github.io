 
const download = require('download-git-repo')
const ora = require('ora')
const process = ora(`下载.....项⽬目`)
process.start()
download('github:su37josephxia/vue-template', 'test', err => {
if(err){ process.fail()
}else{ process.succeed()
} })