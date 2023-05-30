const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const TEMPLATE_PATH = './template.md';  // Replace with your actual template file path
const CSV_PATH = './articles.csv';  // Replace with your actual CSV file path

// Read template content
const templateContent = fs.readFileSync(TEMPLATE_PATH, 'utf8');

fs.createReadStream(CSV_PATH)
    .pipe(csv())
    .on('data', (row) => {
        if (row.content) {
        // Prepare the file path
        const fileName = `${row.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
        const filePath = path.join(__dirname+"/generated", fileName);

        // Replace placeholders in the template
        const fileContent = templateContent.replace('[DATE]', row.date).replace('[TITLE]', row.title).replace('[CONTENT]', row.content);

        // Write the new .md file
        fs.writeFileSync(filePath, fileContent, 'utf8');
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed.');
    });
