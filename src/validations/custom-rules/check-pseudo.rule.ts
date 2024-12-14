import type { Maybe } from '@regle/core';
import { createRule } from '@regle/core';
import { ruleHelpers } from '@regle/rules';
import { createTimeout } from '../../utils/timeout';

const timeout = createTimeout();

export const checkPseudo = createRule({
  async validator(value: Maybe<string>) {
    if (ruleHelpers.isFilled(value)) {
      // Check the timeout function to see how cancellation can be handled
      await timeout(2000);
      return value !== 'regle';
    }
    return true;
  },
  message: 'The pseudo is already taken',
  tooltip({ $value, $invalid }) {
    // console.log($value, $invalid);
    // if (!$value && !$invalid) {
    //   return `Your pseudo can't be "regle"`;
    // }
    return '';
  },
});
