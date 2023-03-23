const env = {
    development: {
      BASE_URL: 'http://localhost:3001/',
      USER_NAME: 'admin',
      PASSWORD: 'admin'
    },
    production: {
      BASE_URL: 'http://localhost:3001/',
        USER_NAME: 'user',
        PASSWORD: 'user'
    },
    test: {
        BASE_URL: 'http://localhost:3001/',
        USER_NAME: 'admin',
        PASSWORD: 'admin'
    },
  };
  
  export const env_var = env[process.env.NODE_ENV];
  