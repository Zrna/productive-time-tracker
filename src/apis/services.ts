import { Services } from '../interfaces/services';
import { backend } from '../services/backend';

export const getServices = async () => {
  return await backend.get<Services>('/services');
};
