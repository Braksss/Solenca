module.exports = ({ env }) => ({
  url: env('PUBLIC_URL', 'https://super-duper-system-v6pv9pwrj954hw9pw-1337.app.github.dev'),
  host: '0.0.0.0',
  port: 1337,
  app: {
    keys: env.array('APP_KEYS'),
  },
});