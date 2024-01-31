import { createContext } from 'react';
import { SearchEngine } from '@coveo/headless/dist/definitions/app/search-engine/search-engine';
import { buildSearchEngine, getOrganizationEndpoints } from '@coveo/headless';

const COVEO_ORGANIZATION_ID = process.env.NEXT_PUBLIC_COVEO_ORGANIZATION_ID || '';
const COVEO_API_KEY = process.env.NEXT_PUBLIC_COVEO_API_KEY || '';

export const getHeadlessEngine = () =>
  buildSearchEngine({
    configuration: {
      organizationId: COVEO_ORGANIZATION_ID,
      accessToken: COVEO_API_KEY,
      organizationEndpoints: getOrganizationEndpoints(COVEO_ORGANIZATION_ID),
    },
  });

export const HeadlessEngineContext = createContext<SearchEngine>(getHeadlessEngine());
