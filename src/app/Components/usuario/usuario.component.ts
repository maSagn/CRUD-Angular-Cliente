import { Component } from '@angular/core';
import { UsuarioModel } from '../../Interface/UsuarioModel';
import { UsuarioService } from '../../Service/usuario.service';
import { AuthService } from '../../Service/auth.service';

// Sweet alert (solo cuando se usa CDN)
declare var Swal: any;

@Component({
  selector: 'app-usuario',
  standalone: false,
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {

  usuarios: UsuarioModel[] = [];

  constructor(private usuarioService: UsuarioService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getAll().subscribe(
      data => {
        this.usuarios = data;
        console.log("Usuarios cargados")
      },
      error => {
        console.log("Error al obtener a los usuarios");
      });
  }

  eliminar(idUsuario : number) {
    // this.usuarioService.delete(idUsuario).subscribe(() => {
    //   console.log("Usuario eliminado");

    //   //Recargar lista
    //   this.cargarUsuarios();
    // })

    Swal.fire({
    title: "¿Estás seguro?",
    text: "No podrás revertir este proceso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, elimínalo!",
    cancelButtonText: "Cancelar"
  }).then((result: any) => {
    if (result.isConfirmed) {
      // Solo eliminar si confirmó
      this.usuarioService.delete(idUsuario).subscribe(() => {
        Swal.fire({
          title: "¡Eliminado!",
          text: "El usuario ha sido eliminado satisfactoriamente.",
          icon: "success"
          // timer: 2000
        });
        // Recargar lista después de eliminar
        this.cargarUsuarios();
      }, error => {
        Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el usuario.",
          icon: "error"
        });
      });
    }
  });
  }
}
