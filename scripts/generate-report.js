const reporter = require('cucumber-html-reporter');
const fs = require('fs');

const reportsPath = 'reports/cucumber-report.json';

if (!fs.existsSync(reportsPath)) {
  console.log('⚠️ Report JSON não encontrado, pulando geração de HTML');
  process.exit(0);
}

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    Project: 'QA Automation Challenge',
    Environment: 'CI',
    Browser: 'Chromium',
    Platform: 'Linux',
    Execution: 'GitHub Actions'
  }
};

reporter.generate(options);
console.log('✅ Cucumber report gerado com sucesso');