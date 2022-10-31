export default () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  serverName: process.env.SERVER_NAME || '',
  // database: {
  //   host: process.env.DATABASE_HOST || 'localhost',
  //   port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  // },
});
