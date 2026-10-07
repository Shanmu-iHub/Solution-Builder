const fs = require('fs');

const files = {
  'c:/My Experiments/Solution-Builder/src/modules/planning/discovery/OpportunityDiscovery.tsx': 'opportunity',
  'c:/My Experiments/Solution-Builder/src/modules/planning/discovery/ProblemDiscovery.tsx': 'problem',
  'c:/My Experiments/Solution-Builder/src/modules/planning/discovery/SolutionDiscovery.tsx': 'solution',
  'c:/My Experiments/Solution-Builder/src/modules/planning/discovery/BusinessModel.tsx': 'business-model',
  'c:/My Experiments/Solution-Builder/src/modules/planning/discovery/ProductDefinition.tsx': 'product',
  'c:/My Experiments/Solution-Builder/src/modules/planning/discovery/Requirements.tsx': 'requirements',
  'c:/My Experiments/Solution-Builder/src/modules/planning/discovery/RequirementDocuments.tsx': 'documents',
  'c:/My Experiments/Solution-Builder/src/modules/planning/phases/ArchitectureValidation.tsx': 'architecture_validation',
};

for (const [file, stageId] of Object.entries(files)) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace <CSuiteValidation roles={['CPO', 'CBO']} ... />
    content = content.replace(/<CSuiteValidation roles=\{\[.*?\]\}/g, `<CSuiteValidation stageId="${stageId}"`);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
}
