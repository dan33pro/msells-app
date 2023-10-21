const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

const endPoints = {
  auth: {
    login: `${API}/api/${VERSION}/auth/login/`,
    profile: `${API}/api/${VERSION}/auth/profile/`,
  },
  products: {
    getProduct: (id) => `${API}/api/${VERSION}/products/${id}/`,
    getAnyProducts: (inicio, fin) => `${API}/api/${VERSION}/products?offset=${inicio}&limit=${fin}`,
    getProducts: `${API}/api/${VERSION}/products/`,
    addProduct: `${API}/api/${VERSION}/products/`,
    updateProduct: (id) => `${API}/api/${VERSION}/products/${id}/`,
    deleteProduct: (id) => `${API}/api/${VERSION}/products/${id}/`,
  },
  categories: {
    getCategory: (id) => `${API}/api/${VERSION}/categories/${id}/`,
    getCategoryItems: (id) => `${API}/api/${VERSION}/categories/${id}/products/`,
    getCategoriesList: `${API}/api/${VERSION}/categories/`,
    addCategory: `${API}/api/${VERSION}/categories/`,
    updateCategory: (id) => `${API}/api/${VERSION}/categories/${id}/`,
  },
  users: {
    getUser: (id) => `${API}/api/${VERSION}/users/${id}`,
    getUsers: `${API}/api/${VERSION}/users`,
    checkEmail: `${API}/api/${VERSION}/users/is-available`,
  },
  files: {
    addImage: `${API}/api/${VERSION}/files/upload/`,
  },
};

export default endPoints;
