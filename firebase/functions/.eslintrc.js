module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/.eslintrc.js', // <-- ADDED: Ignore this configuration file itself
    '/lib/**/*', // Ignore built files.
    '/generated/**/*', // Ignore generated files.
  ],
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    // --- Custom Rule Adjustments for Firebase/Sanity Code ---

    // Allow the use of 'any' type, but treat it as a warning instead of an error.
    '@typescript-eslint/no-explicit-any': 'warn',

    // Allow the non-null assertion operator (!) for environment variables like process.env.SANITY_TOKEN!
    '@typescript-eslint/no-non-null-assertion': 'off',

    // Allow named exports in module files
    'prefer-const': 'error',

    // --- Previous Fixes ---

    // FIX: Enforce CRLF linebreaks (Windows standard)
    'linebreak-style': 'off',

    // 1. Disable the base ESLint 'indent' rule to avoid conflicts with the TypeScript parser.
    indent: 'off',

    // 2. Enable and configure the TypeScript-aware 'indent' rule to enforce 4 spaces.
    '@typescript-eslint/indent': ['error', 4],

    // Keep your other rules
    quotes: ['error', 'double'],
    'import/no-unresolved': 0, // Keep 0 to bypass external package resolution

    'eol-last': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    // 'array-bracket-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'never'],
    'require-jsdoc': 0,
    'max-len': ['error', { code: 300 }],
    '@typescript-eslint/no-inferrable-types': 'off',
  },
};
