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
  showMessage = true; // Inicialmente mostramos solo el mensaje principal
  http = inject(HttpClient);

  ngOnInit() {
    this.initParticles();
    
    // Mostrar el mensaje principal después de un breve retraso
    setTimeout(() => {
      this.showMessage = true; // Aparece desde la izquierda
      
      // Después de 5 segundos, ocultar el mensaje principal (sale por la derecha)
      setTimeout(() => {
        this.showMessage = false;
        
        // Esperar a que termine la animación de salida antes de mostrar el mensaje de cierre
        setTimeout(() => {
          this.showMessage = false; // Mostrar el mensaje "Puedes cerrar esta ventana"
        }, 500); // Tiempo suficiente para que termine la animación de salida
      }, 5000); // 5 segundos de permanencia
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