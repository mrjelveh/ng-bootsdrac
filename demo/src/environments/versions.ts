let bootsdrac: string = require('../../../package.json').devDependencies['bootsdrac'];
// extracts only the minor version from package.json
// ex. "bootsdrac": "4.0.1" -> "4.0"
bootsdrac = bootsdrac.split('.').slice(0, 2).join('.');

const ngbootsdrac = require('../../../package.json').version;

export const versions: {[key: string]: string} = {bootsdrac, ngbootsdrac};
