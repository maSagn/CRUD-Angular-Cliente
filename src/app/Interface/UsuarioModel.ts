import { RolModel } from "./RolModel"

export interface UsuarioModel{
    idUsuario : number,
    nombre : string,
    apellidoPaterno : string,
    apellidoMaterno : string,
    email : string,
    password : string
    rol : RolModel,
    imagen ?: string
}