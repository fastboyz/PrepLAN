import { ValidationErrors, AbstractControl, FormControl, Validator } from '@angular/forms';

export class RegistrationFormValidators{
    static trimValue(control: AbstractControl): ValidationErrors | null {
        if((control.value as string).length >0 && (control.value as string).trim().length == 0) return {shouldNotHaveSpaces: true}
        
        // If there is no validation failure, return null
        return null;
    }
}