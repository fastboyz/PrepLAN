import { ValidationErrors, AbstractControl, FormControl, Validator } from '@angular/forms';

export class FormValidators {
  static dateTimePattern = '^((19|20)\\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]) \\b((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))';
  static datePattern = '^((19|20)\\d{2})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])';
  static discordPattern = '(\\S*)#(\\d{4})';
  static emailPattern = '';
  static phoneNumberPattern = '[0-9]{3}-?[0-9]{3}-?[0-9]{4}';

  static trimValue(control: AbstractControl): ValidationErrors | null {
    if ((control.value as string).length > 0 && (control.value as string).trim().length === 0) { return { shouldNotHaveSpaces: true }; }

    // If there is no validation failure, return null
    return null;
  }
}
