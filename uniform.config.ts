import type { CLIConfiguration } from '@uniformdev/cli';

const config: CLIConfiguration = {
  serialization: {
    allowEmptySource: true,
    entitiesConfig: {
      projectMapNode: {},
      composition: {},
    },
  },
};

module.exports = config;
