const prompts = require('@clack/prompts');
const pc = require('picocolors');

/**
 * Show a styled intro message
 */
async function intro(message) {
  prompts.intro(pc.bold(pc.cyan(message)));
}

/**
 * Show a styled outro message
 */
async function outro(message) {
  prompts.outro(pc.bold(pc.green(message)));
}

/**
 * Show a note message
 */
function note(message, title) {
  prompts.note(message, title);
}

/**
 * Show a spinner
 */
function spinner() {
  return prompts.spinner();
}

/**
 * Ask a text question
 */
async function text(options) {
  return prompts.text(options);
}

/**
 * Ask a select question
 */
async function select(options) {
  return prompts.select(options);
}

/**
 * Ask a multi-select question
 */
async function multiselect(options) {
  return prompts.multiselect(options);
}

/**
 * Ask a confirm question
 */
async function confirm(options) {
  return prompts.confirm(options);
}

/**
 * Cancel the process
 */
function cancel(message = 'Operation cancelled') {
  prompts.cancel(message);
  process.exit(0);
}

/**
 * Check if user cancelled
 */
function isCancel(value) {
  return prompts.isCancel(value);
}

module.exports = {
  intro,
  outro,
  note,
  spinner,
  text,
  select,
  multiselect,
  confirm,
  cancel,
  isCancel,
};
