import { ValidationErrors, AbstractControl, FormControl, Validator } from '@angular/forms';

export class RegistrationFormValidators{
    static trimValue(control: AbstractControl): ValidationErrors | null {
        console.log((control.value as string).trim());
        if((control.value as string).trim().length == 0) return {shouldNotHaveSpaces: true}
        
        // If there is no validation failure, return null
        return null;
    }
}