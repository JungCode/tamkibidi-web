import { exec } from 'child_process';
import { promises as fs } from 'fs';
import inquirer from 'inquirer';
import path from 'path';

const capitalizeFirstLetter = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getEntities = async (basePath) => {
  const entities = [];
  const items = await fs.readdir(basePath);

  for (const item of items) {
    const itemPath = path.join(basePath, item);
    const stat = await fs.stat(itemPath);

    if (stat.isFile() && (item.endsWith('.graphql') || item.endsWith('.gql'))) {
      const entityName = item.replace(/\.graphql$|\.gql$/i, '');
      if (entityName.trim() !== '') {
        entities.push(capitalizeFirstLetter(entityName));
      }
    }
  }

  return entities;
};

const selectEntity = async (entities) => {
  // 1. Manually print the menu so the terminal CANNOT hide it
  console.log('\n--- 📂 AVAILABLE FILES ---');
  console.log('0) 🚀 Run for ALL files');
  entities.forEach((entity, index) => {
    console.log(`${index + 1}) ${entity}`);
  });
  console.log('--------------------------\n');

  // 2. Ask for a simple text input (the number)
  const { selection } = await inquirer.prompt([
    {
      message: 'Type the NUMBER of the file you want to run (e.g., 0 or 1):',
      name: 'selection',
      type: 'input',
      validate: (input) => {
        const num = parseInt(input, 10);
        if (isNaN(num) || num < 0 || num > entities.length) {
          return '❌ Please enter a valid number from the list above.';
        }
        return true;
      }
    },
  ]);

  const selectedIndex = parseInt(selection, 10);
  
  if (selectedIndex === 0) {
    return 'ALL';
  }
  
  return entities[selectedIndex - 1];
};

const runCodegen = (entity) => {
  console.info(`⏳ Generating code for: ${entity}...`);
  
  const command = `graphql-codegen -r dotenv/config --config codegen.ts ${entity.toLowerCase()}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Error executing command for ${entity}: ${err.message}`);
      return;
    }

    if (stderr) {
      console.warn(`⚠️ stderr for ${entity}: ${stderr}`);
    }

    console.info(`✅ Success for ${entity}: \n${stdout}`);
  });
};

const main = async () => {
  try {
    const basePath = 'src/shared/api'; 
    const entities = await getEntities(basePath);

    if (entities.length === 0) {
      console.error(`No valid .graphql or .gql files found in ${basePath}`);
      return;
    }

    const selectedEntity = await selectEntity(entities);

    if (selectedEntity === 'ALL') {
      console.info(`Starting codegen for ${entities.length} files...`);
      for (const entity of entities) {
        runCodegen(entity);
      }
    } else {
      runCodegen(selectedEntity);
    }
  } catch (error) {
    console.error(`💥 Error: ${error.message}`);
  }
};

main();