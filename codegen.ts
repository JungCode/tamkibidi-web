import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const entity = process.argv[process.argv.length - 1];

const ENDPOINT = process.env.VITE_API_CONFIG_ENDPOINT;

const baseGeneratedTypes = "src/shared/api/schemas.tsx";

const resourceGeneratedTypes = "shared/api/schemas.tsx";
const documentsPathFile = `src/shared/api/${entity}.{gql,graphql}`;

const config: CodegenConfig = {
  config: {
    namingConvention: {
      transformUnderscore: true,
    },
    scalars: {
      ['DateTime']: 'string',
      ['Float']: 'number',
      ['ID']: 'string',
      ['Int']: 'number',
      ['ObjectID']: 'string',
      ['UUID']: 'string',
    },
  },
  documents: documentsPathFile,
  generates: {
    [baseGeneratedTypes]: {
      config: {
        onlyOperationTypes: true,
        skipTypename: true,
      },
      plugins: [
        'typescript',
        {
          add: {
            content: `
              /* eslint-disable @typescript-eslint/no-explicit-any */
              /* eslint-disable max-lines */
            `,
          },
        },
      ],
    },
    'src/': {
      config: {
        apolloReactHooksImportFrom: '@apollo/client/react',
        dedupeFragments: true,
        dedupeOperationSuffix: true,
        defaultBaseOptions: {
        },
        withComponent: false, // Optional: Skip React components if not used
        withHOC: false, // Optional: Skip Higher-Order Components if not used
        // Add these to control typescript-react-apollo output
        withHooks: true, // Keep generating hooks
        withMutationFn: false, // Optional: Skip mutation function types if not needed
        withMutationOptionsType: false,
        withRefetchFn: false,
        withResultType: false, // Skip generating *QueryHookResult and *QueryResult types
      },
      hooks: {
        afterOneFileWrite: ['node scripts/fix-apollo-react-types.js', 'prettier --write'],
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: resourceGeneratedTypes,
        extension: '.schemas.tsx',
        fileName: `../${entity}`,
        importTypesNamespace: 'SchemaTypes',
      },
    },
  },
  hooks: {
    afterOneFileWrite: ['pnpm prettier --write'],
  },
  overwrite: true,
  schema: ENDPOINT,
};

export default config;
