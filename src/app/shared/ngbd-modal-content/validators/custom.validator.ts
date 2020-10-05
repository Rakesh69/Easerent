import { AbstractControl, FormGroup } from '@angular/forms';
const d = new Date();

/**
 * isAlphabet is checked string is alphabet or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isAlphabet(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[a-zA-Z ]+$');
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isAlphabet: true };
    } 

    return null;      
}


/**
 * isAlphabetWithoutSpace is checked string is alphabet or not without space.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isAlphabetWithoutSpace(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[a-zA-Z]+$');
    
    if (control.value && !strRegEx.test(control.value)) {
        return { isAlphabetWithoutSpace: true };
    } 

    return null;      
}

/**
 * isAlphabetWithoutSpaceAtStart is checked string is alphabet or not without space at start.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isAlphabetWithoutSpaceAtStart(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[a-zA-Z]+[a-zA-Z ]*$');
    
    if (control.value && !strRegEx.test(control.value)) {
        return { isAlphabetWithoutSpaceAtStart: true };
    } 

    return null;      
}

/**
 * isAddressWithoutSpaceAtStart is checked string is a valid address or not without space at start.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isAddressWithoutSpaceAtStart(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[a-zA-Z0-9]+[a-zA-Z0-9,. ]*$');
    
    if (control.value && !strRegEx.test(control.value)) {
        return { isAddressWithoutSpaceAtStart: true };
    } 

    return null;      
}


/**
 * isNumber is checked string is number or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isNumber(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[0-9]+$');
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isNumber: true };
    } 

    return null;     
}


/**
 * isNumber is checked string is number or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isPhoneNumber(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^(?!0+$)[0-9]+$');
    
    if (control.value && !strRegEx.test(control.value)) {
        return { isPhoneNumber: true };
    } 

    return null;     
}

/**
 * isNumber is checked string is number or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isPhoneNumberWithCode(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp(/^\+[0-9()-]+$/);
    
    if (control.value && !strRegEx.test(control.value)) {
        return { isPhoneNumberWithCode: true };
    } 

    return null;     
}


/**
 * isNumber is checked string is number or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isNumberAndAlphabet(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[0-9a-zA-Z ]+$');
    
    if (control.value && !strRegEx.test(control.value)) {
        return { isNumberAndAlphabet: true };
    } 

    return null;     
}

/**
 * isNumber is checked string is number or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isNumberWithDash(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[0-9-]+$');
    
    if (control.value && !strRegEx.test(control.value)) {
        return { isNumberWithDash: true };
    } 

    return null;     
}

/**
 * isNumber is checked string is number or blank.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isNumberWithBlank(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^[0-9]*$');
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isNumberWithBlank: true };
    } 

    return null;     
}

/**
 * isValidEmail is checked string is valid email or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */

export function isDecimal(control: AbstractControl): { [key: string]: boolean } | null {       
    const strRegEx = new RegExp(/^(\d*\.)?\d+$/);
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isDecimal: true };
    } 

    return null;     
}

/**
 * isValidEmail is checked string is valid email or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */

export function isDecimalWithBlank(control: AbstractControl): { [key: string]: boolean } | null {       
    const strRegEx = new RegExp(/^(\d*\.)?\d*$/);
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isDecimalWithBlank: true };
    } 

    return null;     
}

/**
 * Check the givens email valid or not.
 *
 * @export
 * @param {AbstractControl} control Pass controller data.
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isValidEmail(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)?\.?([a-zA-Z0-9_\-]+)\.([a-zA-Z]{2,5})$/);
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isValidEmail: true };
    } 

    return null;     
}



/**
 * Check the givens email valid or not.
 *
 * @export
 * @param {AbstractControl} control Pass controller data.
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isValidUrl(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^(https?://)(www\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$', 'i');
    
    console.log('control.value : ', control.value);
    
    if (control.value && !strRegEx.test(control.value)) {
        return { isValidUrl: true };
    } 

    return null;     
}

/**
 * Check the givens email valid or not.
 *
 * @export
 * @param {AbstractControl} control Pass controller data.
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isValidInstagramUrl(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp(/(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/im);
    
    console.log('control.value : ', control.value);
    
    if (control.value && !strRegEx.test(control.value)) {
        return { isValidInstagramUrl: true };
    } 

    return null;     
}

/**
 * Check the givens email valid or not.
 *
 * @export
 * @param {AbstractControl} control Pass controller data.
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isValidFacebookUrl(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp(/^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i);
    
    console.log('control.value : ', control.value);
    
    if (control.value && !strRegEx.test(control.value)) {
        return { isValidFacebookUrl: true };
    } 

    return null;     
}

/**
 * isPassword is checked string is valid Password or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isPassword(control: AbstractControl): { [key: string]: boolean } | null {   
    const strRegEx = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    
    if (control.value !== undefined && !strRegEx.test(control.value)) {
        return { isPassword: true };
    } 
    return null;     
}


/**
 * isPassword is checked string is valid year or not.
 *
 * @export
 * @param {AbstractControl} control
 * @returns {({ [key: string]: boolean } | null)} return data of result.
 */
export function isValidYear(control: AbstractControl): { [key: string]: boolean } | null {       
    const strRegEx = new RegExp('^[0-9]{4}$');
    
    if (parseInt(control.value) > d.getFullYear() || !strRegEx.test(control.value)) {
        return { isValidYear: true };
    } 
    return null;     
}



export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}