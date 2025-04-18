const CONSTANTS = {
  BREAKPOINTS: {
    MD: 768,
    LG: 1024,
    XLG: 1280,
  },
  API_ENTITY_URLS: {
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
  },
  REGEX: {
    TITLE: /^[A-Za-z\s]+$/,
  },
  INDEX_DB: {
    PRODUCTS_DB_NAME: 'ProductDatabase',
    PRODUCTS_DB_VERSION: 1,
    PRODUCTS_STORE_NAME: 'products',
  },
};

export default Object.freeze(CONSTANTS);
