const fs = require('fs');
const reportPath = 'reports/cucumber-report.json';

if (!fs.existsSync(reportPath)) {
    console.log('Cucumber report não encontrado');
    process.exit(0);
}

const report = JSON.parse(
    fs.readFileSync(reportPath, 'utf8')
);

let total = 0;
let passed = 0;
let failed = 0;

report.forEach(feature => {
    feature.elements.forEach(scenario => {
        total++;
        const hasFailed =
            scenario.steps.some(
                s => s.result.status === 'failed'
            );

        if (hasFailed) {
            failed++;
        } else {
            passed++;
        }
    });
});

const summary = {
    total,
    passed,
    failed
};

fs.writeFileSync(
    'reports/api-summary.json',
    JSON.stringify(summary, null, 2)
);

console.log('API summary gerado');