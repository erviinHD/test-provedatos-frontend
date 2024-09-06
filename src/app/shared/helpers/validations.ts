import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validarCedula(
  control: AbstractControl
): ValidationErrors | null {
  const cedulaRegex = /^(0[1-9]|1[0-9]|2[0-4])[0-9]{8}$/;
  const cedula = control.value;

  if (!cedulaRegex.test(cedula)) {
    return { cedulaInvalida: true };
  }

  return null;
}
