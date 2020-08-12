#!/usr/bin/env node

let language = process.argv[2]
let fs = require('fs');

let languageString = fs.readFileSync(language + '/LC_MESSAGES/global.po', 'UTF-8')

languageString = languageString.replace(/msgid[\s\S]*"Plural-Forms: nplurals=1; plural=0;\\n"/, '')
languageString = languageString.replace(/"\n"/g, '')

const regexLine = /msgid ".+"[\s]*msgstr ".+"/g
const regex = /msgid "(.+)"[\s]*msgstr "(.+)"/
let languageLineMap = languageString.match(regexLine)
let languageObject = {}
languageLineMap.forEach((value, index) => {
    let temp = value.match(regex)
    languageObject[temp[1]] = temp[2]
})
fs.writeFileSync(language + '.json', JSON.stringify(languageObject), 'UTF-8')
