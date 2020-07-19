const { default: readExcelFile } = require('read-excel-file');

module.exports = {
    xlsxToJira (input, options) {
        return readExcelFile(input, options)
            .then((sheetContent) => {
                const [headers, ...rows] = sheetContent;
                const outputRows = [`||${headers.join('||')}||`];

                rows.forEach((row) => {
                    outputRows.push(`|${row.join('|')}|`);
                });

                return outputRows.join('\n');
            });
    }
};

