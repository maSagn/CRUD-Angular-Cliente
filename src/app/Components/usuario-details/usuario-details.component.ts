import { Component } from '@angular/core';
import { UsuarioModel } from '../../Interface/UsuarioModel';
import { UsuarioService } from '../../Service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Service/auth.service';

@Component({
  selector: 'app-usuario-details',
  standalone: false,
  templateUrl: './usuario-details.component.html',
  styleUrl: './usuario-details.component.css'
})
export class UsuarioDetailsComponent {

  usuario!: UsuarioModel;
  //previewImagen: string | ArrayBuffer | null = null;

  constructor(private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarUsuario();
  }
  
  cargarUsuario() {
    const idUsuario = this.authService.getUserId();

    if (idUsuario) {
      this.usuarioService.getById(idUsuario).subscribe(usuario => {
        this.usuario = usuario;
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
