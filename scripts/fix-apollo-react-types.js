import { promises as fs } from 'fs';
import path from 'path';

const cwd = process.cwd();
const args = process.argv.slice(2);

const looksGeneratedSchemaFile = (filePath) =>
  filePath.endsWith('.schemas.ts') || filePath.endsWith('.schemas.tsx');

const normalizeInputPath = (targetPath) =>
  path.isAbsolute(targetPath) ? targetPath : path.join(cwd, targetPath);

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

const updateFile = async (filePath) => {
  let content = await fs.readFile(filePath, 'utf8');

  // Remove unused Apollo import
  content = content.replace("import * as Apollo from '@apollo/client';\n", '');

  // Remove the generated 3-overload suspense block header:
  //   // @ts-ignore  (or @ts-expect-error from a prior fixer run)
  //   export function use<X>SuspenseQuery(...): ...; (overload 1)
  //   export function use<X>SuspenseQuery(...): ...; (overload 2)
  // The implementation function that follows is kept as-is.
  content = content.replace(/\/\/ @ts-(?:ignore|expect-error[^\n]*)\n[^\n]+;\n[^\n]+;\n/g, '');

  // Fix TS2769: spreading optional baseOptions loses the required `variables`
  // constraint on useSuspenseQuery.Options<TVars>. Add an explicit cast so
  // TypeScript knows the value still satisfies the options parameter type.
  content = content.replace(
    /(\s+const options = baseOptions === ApolloReactHooks\.skipToken \? baseOptions : \{\.\.\.defaultOptions, \.\.\.baseOptions\})(\n\s+return ApolloReactHooks\.useSuspenseQuery<(\w+), (\w+)>)/g,
    '$1 as ApolloReactHooks.SkipToken | ApolloReactHooks.useSuspenseQuery.Options<$4>$2',
  );
  // SuspenseQueryHookOptions<TData, TVariables> = useSuspenseQuery.Options<TVariables>
  // — it only takes TVariables, so drop the first type param.
  content = content.replace(
    /ApolloReactHooks\.SuspenseQueryHookOptions<(\w+),\s*(\w+)>/g,
    'ApolloReactHooks.useSuspenseQuery.Options<$2>',
  );

  const nextContent = content
    .replaceAll('ApolloReactHooks.MutationHookOptions<', 'ApolloReactHooks.useMutation.Options<')
    .replaceAll('ApolloReactHooks.QueryHookOptions<', 'ApolloReactHooks.useQuery.Options<')
    .replaceAll('ApolloReactHooks.LazyQueryHookOptions<', 'ApolloReactHooks.useLazyQuery.Options<')
    .replaceAll('ApolloReactHooks.SubscriptionHookOptions<', 'ApolloReactHooks.useSubscription.Options<')
    .replaceAll('ApolloReactHooks.UseSuspenseQueryResult<', 'ApolloReactHooks.useSuspenseQuery.Result<')
    .replaceAll('ApolloReactHooks.MutationResult<', 'ApolloReactHooks.useMutation.Result<')
    .replaceAll('ApolloReactHooks.QueryResult<', 'ApolloReactHooks.useQuery.Result<')
    .replaceAll('ApolloReactHooks.LazyQueryResult<', 'ApolloReactHooks.useLazyQuery.Result<')
    .replaceAll('ApolloReactHooks.SubscriptionResult<', 'ApolloReactHooks.useSubscription.Result<')
    .replaceAll('ApolloReactHooks.MutationTuple<', 'ApolloReactHooks.useMutation.ResultTuple<')
    .replaceAll('ApolloReactHooks.LazyQueryResultTuple<', 'ApolloReactHooks.useLazyQuery.ResultTuple<');

  if (nextContent !== content) {
    content = nextContent;
  }

  await fs.writeFile(filePath, content, 'utf8');
};

const run = async () => {
  const explicitTargets = args
    .map((targetPath) => normalizeInputPath(targetPath))
    .filter((targetPath) => looksGeneratedSchemaFile(targetPath));

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
