import ApiBuilder from '@/apis/api-builder';

// TODO: We are using api builder with axios for proper api abstraction
const api = {
  users: {
    getAll: new ApiBuilder('GET', '/users'),
    getOne: new ApiBuilder('GET', '/users/[id]'),
  },
};

export default api;
