const fs = require('fs');

const reportPath =
  'reports/playwright-report.json';

if (!fs.existsSync(reportPath)) {
  console.log('Playwright report não encontrado');
  process.exit(0);
}

const report =
  JSON.parse(fs.readFileSync(reportPath, 'utf8'));

let total = 0;
let passed = 0;
let failed = 0;

function parseSuites(suites) {
  suites.forEach(suite => {
    if (suite.specs) {
      suite.specs.forEach(spec => {
        spec.tests.forEach(test => {
          total++;
          const status =
            test.results?.[0]?.status;
          if (status === 'passed') {
            passed++;
          } else {
            failed++;
          }
        });
      });
    }
    if (suite.suites) {
      parseSuites(suite.suites);
    }
  });
}

parseSuites(report.suites);
const summary = {
  total,
  passed,
  failed
};

fs.writeFileSync(
  'reports/api-summary.json',
  JSON.stringify(summary, null, 2)
);

console.log('✅ API summary gerado');