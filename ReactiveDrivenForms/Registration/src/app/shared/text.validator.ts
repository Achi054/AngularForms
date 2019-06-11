import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenTextValidator(expression: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbiddenText = expression.test(control.value);
    return forbiddenText ? { 'forbiddenValue': { value: control.value }} : null;
  };
}
