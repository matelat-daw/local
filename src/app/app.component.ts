import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {
  title = 'local';
  showMessage = false;

  ngOnInit() {
    // Mostrar el mensaje con animación
    setTimeout(() => {
      this.showMessage = true;
      
      // Después de 3 segundos, ocultar el mensaje y cerrar
      setTimeout(() => {
        this.showMessage = false;
        
        // Dar tiempo para que termine la animación de salida
        setTimeout(() => {
          window.close();
        }, 500);
      }, 3000);
    }, 100);
  }
}