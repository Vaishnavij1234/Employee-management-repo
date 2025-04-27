
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://vaishnavij1234.github.io/Employee-management-repo/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/Employee-management-repo/employee",
    "route": "/Employee-management-repo"
  },
  {
    "renderMode": 2,
    "route": "/Employee-management-repo/employee"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 5586, hash: '3ce96e8a772e8514cc347cf770b2dc03f0f1d4fe5c6d2c9fb5cf6e2346d960aa', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1558, hash: '23d18d0b219b6a6cb32aaff8465b95e675e1bf5e01964657409bf629f1685567', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'employee/index.html': {size: 32667, hash: 'd4f16431d172e266bf1bb05e7992f9a47d80f50ed649850c3e3810b32f13e0c6', text: () => import('./assets-chunks/employee_index_html.mjs').then(m => m.default)},
    'styles-DPQ53L3S.css': {size: 230768, hash: 'eeRGZBkJAUs', text: () => import('./assets-chunks/styles-DPQ53L3S_css.mjs').then(m => m.default)}
  },
};
