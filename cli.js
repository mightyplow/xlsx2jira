#!/usr/bin/env node

const fs = require('fs');
const meow = require('meow');
const { xlsxToJira } = require('./index.js');

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
    }
});

const [source] = cli.input;

if (!source) {
    console.error('No source file specified.\nRun xlsx2jira --help to see how to use this tool.');
    process.exit(1);
}

const { sheet } = cli.flags;
const fileContent = fs.readFileSync(source);

xlsxToJira(fileContent, { sheet })
    .then((jiraTable) => {
        console.log(jiraTable);
    });

