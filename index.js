var authors = require('parse-author');

var re_shortenUrl1 = /^.*:\/+(.*)/;
var re_shortenUrl2 = /\/*$/;
var re_dateReplace1 = /\.[^Z]+/;
var re_dateReplace2 = /[-:]/g;

var shortenUrl = function(url) {
    return (url || '').replace(re_shortenUrl1, '$1').replace(re_shortenUrl2, '');
};

var renderName = function(pkg, fullname) {
    return fullname || pkg.fullname || (pkg.config && pkg.config.fullname) || pkg.name;
};

var renderVersion = function(pkg, date, renderDev) {
    var out = 'v' + pkg.version;
    if (renderDev && pkg.version.split('-')[1]) {
        out += '+' + date.replace(re_dateReplace2, '');
    }
    return out;
};

var buildAuthor = function(pkg) {
    return (typeof pkg.author === 'string' ? authors(pkg.author) : pkg.author);
};

var renderAuthor = function(pkg) {
    var author = buildAuthor(pkg);
    var out = [];
    if (author) {
        if (author.name) {
            out.push(author.name);
        }
        if (author.url) {
            out.push('(' + author.url + ')');
        }
    }
    return out.join(' ');
};

var renderMin = function(banner) {
    return banner.join(' | ');
};

var renderFull = function(banner) {
    return banner.join('\n');
};

var buildMetaMin = function(pkg) {
    var banner = [];
    if (pkg.foundation) {
        banner.push(pkg.foundation.name);
        banner.push(pkg.foundation.url_short || shortenUrl(pkg.foundation.url));
    }
    var author = buildAuthor(pkg);
    if (author && author.url) {
        banner.push(shortenUrl(author.url));
    }

    if (banner.length) {
        if (pkg.license) {
            banner.push(pkg.license);
        }
    }
    return banner;
};

var buildMetaFull = function(pkg, date) {
    var banner = [];
    if (pkg.foundation) {
        banner.push(pkg.foundation.name);
        banner.push(pkg.foundation.url);
        banner.push('');
    }
    if (date) {
        banner.push('Date: ' + date);
    }
    var author = renderAuthor(pkg);
    if (author) {
        banner.push('Author: ' + author);
    }
    if (pkg.license) {
        banner.push('Licensed under the ' + pkg.license + ' license');
    }
    return banner;
};

var build = function(pkg, isMinified, fullname) {
    var date = new Date().toISOString().replace(re_dateReplace1, '');
    var banner = [];
    banner.push(renderName(pkg, fullname) + ' ' + renderVersion(pkg, date, isMinified));
    if (!isMinified) {
        if (pkg.description) {
            banner.push(pkg.description);
        }
        banner.push('');
    }
    if (isMinified) {
        banner = banner.concat(buildMetaMin(pkg));
    } else {
        banner = banner.concat(buildMetaFull(pkg, date));
    }
    return banner;
};

module.exports = {

    code: function(pkg, isMinified, fullname) {
        var banner = build(pkg, isMinified, fullname);
        if (isMinified) {
            banner = [renderMin(banner)];
        }
        banner.unshift('/*!');
        banner.push('*/\n');
        if (isMinified) {
            return banner.join(' ');
        } else {
            banner[banner.length-2] += '\n ' + banner.pop() + '\n';
            return banner.join('\n * ');
        }
    },

    html: function(pkg) {
        return '<meta name="author" content="' + renderMin(buildMetaMin(pkg)) + '">';
    },

    meta: function(pkg) {
        return renderMin(buildMetaMin(pkg));
    }
};