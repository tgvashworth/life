var path = require('path');
var moment = require('moment');
var chalk = require('chalk');

var utils = {}
module.exports = utils;

utils.dateFormat = 'DD/MM/YY @ hh:mma';
utils.tagRegex = /^\+([a-z0-9_-]+)/i;
utils.allTagsRegex = /(\+[a-z0-9_-]+)/ig;

utils.key = key;
utils.unkey = unkey;
utils.home = home;
utils.logEntry = logEntry;
utils.getIterableElements = getIterableElements;

/**
 * Utils
 */

function key() {
    return [].slice.call(arguments).join('~');
}

function unkey(key) {
    var keys = [].slice.call(arguments, 1);
    var segs = key.split('~');
    return segs.reduce(function (memo, seg, index) {
        if (keys[index]) {
            memo[keys[index]] = seg;
        }
        return memo;
    }, {});
}

function home() {
    var home = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
    var dataHome;

    if (process.platform === 'darwin') {
        // Equivalent of XDG_DATA_HOME based on this SO answer:
        // http://stackoverflow.com/a/5084892/350385
        dataHome = path.join(home, 'Library', 'Life');
    } else if ((new Set(['freebsd', 'sunos', 'linux'])).has(process.platform)) {
        // Based on the XDG basedir spec:
        // http://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html
        dataHome = process.env['XDG_DATA_HOME'] ||
            path.join(home, '.local', 'share', 'life');
    } else {
        dataHome = path.join(home, '.life');
    }

    return dataHome;
}

function logEntry(entry, marker) {
    var date = moment(parseInt(entry.timestamp, 10)).format(utils.dateFormat);
    var annotation = entry.annotation.replace(utils.allTagsRegex, function (match, tag, offset, string) {
        return chalk.blue(tag)
    });
    var prefix = chalk.grey(date + ' :');

    if (marker) {
        prefix = marker + ' ' + prefix;
    }

    var args = [prefix, annotation];
    if (entry.id) {
        args.push(
            chalk.grey('#'+entry.id)
        );
    }
    console.log.apply(console, args);
    var dataBuffer = entry.data.map(function (datum) {
        return chalk.green('@' + datum.key) + ' ' + chalk.yellow(datum.value)
    });
    dataBuffer.length && console.log(' '.repeat(chalk.stripColor(prefix).length), dataBuffer.join(', '));
}

function getIterableElements(iterable) {
    var elems = [];
    iterable.forEach(function (elem) {
        elems.push(elem);
    });
    return elems;
}