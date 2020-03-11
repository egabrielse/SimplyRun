/*
 * action types
 */
export const EXAMPLE = 'EXAMPLE'


/*
 * action creators
 */
export function createExampleAction(parameter) {
  return { type: EXAMPLE, parameter }
}