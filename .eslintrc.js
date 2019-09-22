const { strictEslint } = require('@umijs/fabric');

module.exports = {
  ...strictEslint,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'react/prop-types': 0,
    'import/no-unresolved': 0,
    'func-names': 0
  }
};
