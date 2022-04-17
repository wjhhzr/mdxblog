const dayjs = require('dayjs')
module.exports = {
    helpers: {
        date(format){return dayjs().format(format)},
        month(){return this.date('YYYY-MM')},
        time(){return this.date('YYYY-MM-DD HH:mm:ss')}
    }
}