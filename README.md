# xlsx2jira
A tool which converts an xlsx file into a Jira table. It can be used as a cli or as a library.

## CLI
Can be used on command line to print out the Jira table which. The result can simply be copied and inserted
into a Jira ticket description.

### Installation
```
npm i -g @mightyplow/xlsx2jira
```

### Usage
```
xlsx2jira my_file.xlsx -s 2
```
    
### Parameters
#### --sheet, -s
the sheet to convert; defaults to 1

#### --help
prints the help screen

## Library
Can be used in an app to convert an xlsx file into the Jira table string.

### Installation
```
npm i @mightyplow/xlsx2jira
```

### Functions
#### xlsxToJira(input: Buffer, [options: object])
The input parameter is a string buffer with the content of the xlsx file.

The options is directly passed to [read-excel-file()](https://www.npmjs.com/package/read-excel-file).
It can be used to specify the sheet which should be converted.

```
// options
{
    sheet: 2
}
```

### Usage in node
```
const fs = require('fs');
const { xlsxToJira } = require('@mightyplow/xlsx2jira');

const fileContent = fs.readFileSync(source);
xlsxToJira(fileContent, { sheet })
    .then((jiraTable) => {
        console.log(jiraTable);
    });
```

### Usage in browser
I assume you use a bundler like webpack to create your app.

```
<input type="file" />

<script>
    import { xlsxToJira } from '@mightyplow/xlsx2jira';

    document.querySelector('input').addEventListener('change', (event) => {
        const [file] = event.target.files;
        xlsxToJira(file)
            .then((jiraTable) => {
                console.log(jiraTable);
            });
    }
</script>
```

