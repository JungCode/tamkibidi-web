import { promises as fs } from 'fs';
import path from 'path';

const cwd = process.cwd();
const args = process.argv.slice(2);

const replacements = [
  ['ApolloReactHooks.MutationHookOptions<', 'ApolloReactHooks.useMutation.Options<'],
  ['ApolloReactHooks.QueryHookOptions<', 'ApolloReactHooks.useQuery.Options<'],
  ['ApolloReactHooks.LazyQueryHookOptions<', 'ApolloReactHooks.useLazyQuery.Options<'],
  ['ApolloReactHooks.SubscriptionHookOptions<', 'ApolloReactHooks.useSubscription.Options<'],
  ['ApolloReactHooks.MutationResult<', 'ApolloReactHooks.useMutation.Result<'],
  ['ApolloReactHooks.QueryResult<', 'ApolloReactHooks.useQuery.Result<'],
  ['ApolloReactHooks.LazyQueryResult<', 'ApolloReactHooks.useLazyQuery.Result<'],
  ['ApolloReactHooks.SubscriptionResult<', 'ApolloReactHooks.useSubscription.Result<'],
  ['ApolloReactHooks.MutationTuple<', 'ApolloReactHooks.useMutation.ResultTuple<'],
  ['ApolloReactHooks.LazyQueryResultTuple<', 'ApolloReactHooks.useLazyQuery.ResultTuple<'],
];

const looksGeneratedSchemaFile = (filePath) =>
  filePath.endsWith('.schemas.tsx') || filePath.endsWith('.schemas.ts');

const updateFile = async (filePath) => {
  let content = await fs.readFile(filePath, 'utf8');
  let changed = false;

  for (const [from, to] of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  }

  if (changed) {
    await fs.writeFile(filePath, content, 'utf8');
  }
};

const collectGeneratedFiles = async (dirPath) => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectGeneratedFiles(fullPath)));
      continue;
    }

    if (entry.isFile() && looksGeneratedSchemaFile(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
};

const normalizeInputPath = (p) => (path.isAbsolute(p) ? p : path.join(cwd, p));

const run = async () => {
  const explicitTargets = args
    .map((p) => normalizeInputPath(p))
    .filter((p) => looksGeneratedSchemaFile(p));

  const targets = explicitTargets.length
    ? explicitTargets
    : await collectGeneratedFiles(path.join(cwd, 'src'));

  for (const target of targets) {
    await updateFile(target);
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
