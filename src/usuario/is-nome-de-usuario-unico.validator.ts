import { Injectable } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { 
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    } from "class-validator";

@Injectable()
@ValidatorConstraint()
export class IsNomeDeUsuarioUnicoConstraint implements ValidatorConstraintInterface{

    constructor(private UsuarioService: UsuarioService) {}
    validate(nomeDeUsuario: string, validationArguments?: ValidationArguments): boolean | Promise<boolean>{
        return !!!this.UsuarioService.buscaPorNomeDeUsuario(nomeDeUsuario);
    }
}

export function IsNomeDeUsuarioUnico(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsNomeDeUsuarioUnicoConstraint,
      });
    };
  }