#!/usr/bin/env node

const fs = require('fs');
const readXlsxFile = require('read-excel-file');
const meow = require('meow');

const cli = meow(`
    Converts an xlsx file into a Jira table and prints the output.
    
    Usage:
        xlsx2jira my_file.xlsx -s 2
        
    Parameters:
        --sheet, -s     the sheet to convert; defaults to 1
`, {
    input: ['source'],
    flags: {
        sheet: {
            type: 'number',
            alias: 's',
            default: 1
        }
    },
});

(async function () {
    const [source] = cli.input;

    if (!source) {
        console.error('No source file specified.\nRun xlsx2jira --help to see how to use this tool.');
        process.exit(1);
    }

    const {sheet} = cli.flags;
    const fileContent = fs.readFileSync(source);
    const sheetContent = await readXlsxFile(fileContent, {sheet});

    const [headers, ...rows] = sheetContent;
    const outputRows = [`||${headers.join('||')}||`];

    rows.forEach((row) => {
        outputRows.push(`|${row.join('|')}|`);
    });

    const table = outputRows.join('\n');
    console.log(table);
}());

