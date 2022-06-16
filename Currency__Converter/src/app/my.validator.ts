import { FormControl, ValidationErrors, Validator, Validators } from "@angular/forms";

// export class MyValidator{
//   static numberValue(control:FormControl): {[key: string]: any} | null{
//     if(control.value != Number) {
//      return  {ValueisNAN: true}
//     }
//     return null
//   }
// }

export class myValidator implements Validators{
  static numberValue: Validator | null | undefined;
  numberValue(control:FormControl): {[key: string]: any} | null{
    if(control.value != 1) {
     return  {ValueisNAN: true}
    }
    return null
  }

}