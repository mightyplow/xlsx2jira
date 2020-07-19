const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { xlsxToJira } = require('../index.js');

describe('xlsxToJira()', function () {
    it('should create a jira table from first sheet', function () {
        const testFilePath = path.resolve(__dirname, 'fixtures', 'test.xlsx');
        const fileContent = fs.readFileSync(testFilePath);
        return xlsxToJira(fileContent)
            .then((jiraTable) => {
                assert.strictEqual(jiraTable,
                    '||foo||bar||\n' +
                    '|bla|blubb|'
                );
            });
    });

    it('should create a jira table from passed sheet', function () {
        const testFilePath = path.resolve(__dirname, 'fixtures', 'test.xlsx');
        const fileContent = fs.readFileSync(testFilePath);
        return xlsxToJira(fileContent, {sheet: 2})
            .then((jiraTable) => {
                assert.strictEqual(jiraTable,
                    '||col1||col2||\n' +
                    '|val1|val2|'
                );
            });
    });
});
