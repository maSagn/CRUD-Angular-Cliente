import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../Service/usuario.service';
import { RolService } from '../../Service/rol.service';
import { RolModel } from '../../Interface/RolModel';
import { UsuarioModel } from '../../Interface/UsuarioModel';
import { Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

// Sweet alert (solo cuando se usa CDN)
declare var Swal: any;

@Component({
  selector: 'app-usuario-form',
  standalone: false,
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {

  roles: RolModel[] = [];

  usuarioForm!: FormGroup;
  idUsuario!: number | null;

  previewImagen: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private rolService: RolService,
    public authService: AuthService
  ) {
    // // Inicializar formGroup
    // this.usuarioForm = this.fb.group({
    //   nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]],
    //   apellidoPaterno: ['', Validators.required],
    //   apellidoMaterno: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   rol: ['', Validators.required]
    // });
  }

  ngOnInit(): void {

    this.usuarioForm = this.fb.group({
      idUsuario: [''],
      nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]],
      apellidoPaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]],
      apellidoMaterno: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/), Validators.pattern]],
      rol: [null, [Validators.required]],
      imagen: ['']
    });

    // Revisar si hay un id en la ruta
    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'));

    const idUsuarioLogueado = this.authService.getUserId();

    if (this.idUsuario && idUsuarioLogueado !== this.idUsuario && !this.authService.isAdmin()) {
      this.router.navigate(['/myAccount']);
    }

    // Traer roles
    this.rolService.getAll().subscribe(rolesData => {
      console.log("Roles recibidos: ", rolesData);
      this.roles = rolesData;

      if (this.idUsuario) {
        this.usuarioService.getById(this.idUsuario).subscribe(usuario => {
          const rolSeleccionado = this.roles.find(r => r.idRol === usuario.rol.idRol);

          this.usuarioForm.patchValue({
            idUsuario: usuario.idUsuario,
            nombre: usuario.nombre,
            apellidoPaterno: usuario.apellidoPaterno,
            apellidoMaterno: usuario.apellidoMaterno,
            email: usuario.email,
            rol: rolSeleccionado || null,
            imagen: usuario.imagen
          });

          this.previewImagen = usuario.imagen ?? null;
        });
      }
    });

    // if (this.idUsuario) {
    //   this.usuarioService.getById(this.idUsuario).subscribe(usuario => {
    //     this.usuarioForm.patchValue({
    //       idUsuario : usuario.idUsuario,
    //       nombre: usuario.nombre,
    //       apellidoPaterno : usuario.apellidoPaterno,
    //       apellidoMaterno : usuario.apellidoMaterno,
    //       email : usuario.email,
    //       rol : usuario.rol
    //     });
    //   });
    // }


  }

  // Imagen
  onFileSelect(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    const tiposPermitidos = ['image/png', 'image/jpeg', 'image/jpg'];

    if (!tiposPermitidos.includes(file.type)) {

      Swal.fire({
        title: "Error",
        text: "Solo puedes ingresar imagenes",
        icon: "error"
      });

      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      this.previewImagen = reader.result;

      this.usuarioForm.patchValue({
        imagen: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  mensajeError: string = '';

  guardar() {
    if (this.usuarioForm.valid) {
      console.log("Form valido", this.usuarioForm.value);
      const usuario: UsuarioModel = this.usuarioForm.value;
      console.log("fomulario enviado", usuario);

      if (this.idUsuario) { // Editar
        this.usuarioService.update(usuario, this.idUsuario).subscribe(() => {

          Swal.fire({
            title: "¡Actualizado!",
            text: "El usuario se ha actualizado exitosamente.",
            icon: "success"
          });

          const role = this.authService.getRole();

          if (role === 'Administrador') {
            this.router.navigate(['/usuarios']);
          } else if (role === 'Usuario') {
            this.router.navigate(['/myAccount']);
          }
        })

      } else { // Agregar
        this.usuarioService.add(usuario).subscribe({

          next: (response) => {
            Swal.fire({
              title: "¡Agregado!",
              text: "El usuario se ha registrado correctamente.",
              icon: "success"
            });

            this.router.navigate(['/usuarios']);
            //this.usuarioForm.reset();
          },
          error: (error) => {
            Swal.fire({
              title: "Correo existente",
              text: this.mensajeError = error.error,
              icon: "error"
            });
          }
        });
      }
    } else {
      console.log("Form invalido");
      this.usuarioForm.markAllAsTouched(); // Muestra errores en todos los campos
    }
  }

  compararRoles(r1: RolModel | null, r2: RolModel | null): boolean {
    return r1 && r2 ? r1.idRol === r2.idRol : r1 === r2;
  }

}
