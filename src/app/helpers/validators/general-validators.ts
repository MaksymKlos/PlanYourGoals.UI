import { ValidatorFn, AbstractControl } from "@angular/forms";

export function validateOnlySpaces(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) return null;

    if (control.value.trim() === '') {
      return { 'onlySpaces': { value: control.value } };
    }

    return null;
  };
}

export function validateNoSpaces(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) return null;

    if (control.value.includes(' ')) {
      return { 'haveSpaces': { value: control.value } };
    }

    return null;
  };
}
