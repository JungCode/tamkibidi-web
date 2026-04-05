import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export default {
  projects: {
    accounting: {
      documents: 'src/shared/api/accounting/**/**/*.{graphql,gql}',
      schema: process.env.VITE_SIMON_API_ACCOUNTING_ENDPOINT,
    },
    auth: {
      documents: 'src/shared/api/auth/**/**/*.{graphql,gql}',
      schema: process.env.VITE_SIMON_API_AUTH_ENDPOINT,
    },
    business: {
      documents: 'src/shared/api/business/**/**/*.{graphql,gql}',
      schema: process.env.VITE_SIMON_API_BUSINESS_ENDPOINT,
    },
    config: {
      documents: 'src/shared/api/config/**/**/*.{graphql,gql}',
      schema: process.env.VITE_SIMON_API_CONFIG_ENDPOINT,
    },
  },
};
