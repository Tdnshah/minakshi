// pm2 ecosystem config for the Payload CMS Next.js standalone server.
// Run with:
//   pm2 start cms/deploy/ecosystem.config.cjs
//   pm2 reload cms/deploy/ecosystem.config.cjs
//   pm2 save
//
// The deploy pipeline copies this file (along with server.js, post-deploy.sh,
// migrate.sh, etc.) into each release. The actual cwd that pm2 uses at runtime
// is the symlink  ~/cms/current  which always points at the latest release.

const path = require('path');

module.exports = {
  apps: [
    {
      name: 'payload-cms',
      cwd: '/home/minakshidewan/domains/cms.minakshidewan.com/public_html',
      script: 'server.js',
      // Next.js standalone server.js respects PORT.
      args: [],
      // env is read from the symlinked .env in cwd; nothing to override here.
      env: {
        NODE_ENV: 'production',
      },
      instances: 1,
      exec_mode: 'fork',
      // Restart policy: backoff so we don't loop on a broken DB connection.
      max_restarts: 10,
      restart_delay: 2000,
      exp_backoff_restart_delay: 1000,
      max_memory_restart: '512M',
      kill_timeout: 10000,
      wait_ready: false,
      listen_timeout: 15000,
      // Logs: written under ~/cms/logs/ (a symlink target inside each release's
      // logs/ dir would be created by post-deploy.sh, but to keep things
      // simple we just point at a path pm2 can write under the user's home).
      out_file: '/home/minakshidewan/domains/cms.minakshidewan.com/logs/out.log',
      error_file: '/home/minakshidewan/domains/cms.minakshidewan.com/logs/error.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true,
    },
  ],
};
