const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/cucumber-report.html',
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "Project": "QA Automation Challenge",
    "Environment": "CI",
    "Browser": "Chromium",
    "Platform": "Linux",
    "Execution": "GitHub Actions"
  }
};

reporter.generate(options);