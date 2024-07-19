import { AbstractControl, ValidatorFn } from '@angular/forms';

export function gmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email = control.value;
    const isValid = email.includes('@gmail.com');
    return isValid ? null : { gmail: { value: email } };
  };
}
