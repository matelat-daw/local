import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'local';
  showMessage = false;
  showCloseMessage = false;
  http = inject(HttpClient);

  ngOnInit() {
    // Continuar con la inicialización normal si ya fue recargada
    this.initParticles();
    // Mostrar el mensaje con animación
    setTimeout(() => {
      this.showMessage = true;
      
      // Después de 3 segundos, ocultar el mensaje y mostrar instrucción de cierre
      setTimeout(() => {
        this.showMessage = false;
        
        // Dar tiempo para que termine la animación de salida
        setTimeout(() => {
          // Mostrar un mensaje alternativo si la ventana no se cierra
          setTimeout(() => {
            this.showCloseMessage = true;
          }, 300);
        }, 500);
      }, 5000);
    }, 100);
  }

  initParticles() {
    this.http.get('particles-config.json')
    .subscribe({
      next: (config) => {
        particlesJS('particles-js', config);
        console.log('Configuración de partículas cargada correctamente');
      },
      error: (err) => {
        console.error('Error al cargar la configuración de partículas:', err);
        // Cargar configuración por defecto en caso de error
        this.loadDefaultParticlesConfig();
      }
    });
  }

  loadDefaultParticlesConfig() {
    // Configuración por defecto en caso de que falle la carga del JSON
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        // Configuración mínima para que funcione en caso de error
        "color": { "value": "#ffffff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 3 },
        "line_linked": { "enable": true },
        "move": { "enable": true }
      }
    });
    console.log('Cargada configuración de partículas por defecto');
  }
}