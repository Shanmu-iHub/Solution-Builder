import { OfferingLandingConfig } from '../components/common/ProductLandingLayout';
import { productsOfferingsConfigs } from './productsConfig';
import { moreProductsConfigs } from './moreProductsConfig';
import { servicesOfferingsConfigs } from './servicesConfig';
import { moreServicesOfferingsConfigs } from './moreServicesConfig';
import { solutionBuilderConfigs } from './solutionBuilderConfig';
import { agentServicesConfigs } from './agentServicesConfig';

export const allOfferingsConfigs: Record<string, OfferingLandingConfig> = {
  ...productsOfferingsConfigs,
  ...moreProductsConfigs,
  ...servicesOfferingsConfigs,
  ...moreServicesOfferingsConfigs,
  ...solutionBuilderConfigs,
  ...agentServicesConfigs
};

export const getOfferingConfig = (id: string): OfferingLandingConfig | undefined => {
  return allOfferingsConfigs[id];
};
