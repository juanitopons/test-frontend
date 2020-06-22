# Frontend Test

La prueba consiste en mostrar un calendario con eventos obtenidos de una API e implementar una interacción básica con ellos.
El calendario debe permitir cambiar el modo de vista entre día y semana ([timeGrid](https://fullcalendar.io/docs/timegrid-view)).

## Plugins
- [FullCalendar v5](https://fullcalendar.io) para el calendario e interacción con los eventos
- [Bootstrap v5 y sus dependencias (sin jQuery)](https://v5.getbootstrap.com) para mostrar los detalles de los eventos en una modal
  
No hay que utilizar ningún otro plugin o framework.

## API
- Listado de eventos: `GET` [http://localhost:4000/events](http://localhost:4000/events)
- Detalles de un evento: `GET` [http://localhost:4000/events/:id](http://localhost:4000/events/1)

## Objetivos
- Mostrar los eventos obtenidos de la API en el calendario
- Mostrar los detalles de un evento en una modal de Bootstrap al hacer clic. Reutilizar la misma modal para todos los eventos.
- Permitir mover eventos en el calendario. Si se mueve a sábado o domingo, se debe mostrar una confirmación del navegador con el título "¿Estás seguro?". Si se cancela, el evento debe volver a su posición original. Si se acepta, el evento se moverá de día. No se llamará a la API para estos cambios, por lo que no serán persistidos.
- Añadir un `<select>` para cambiar el idioma del calendario entre inglés y español. Se inicirá con el idioma actual del navegador.
- Al recargar la página el calendario debe mantener la última configuración: día, vista (semana o día) e idioma.

### Capturas


### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Start API Server
```
npm run server
```

### Features:

* ES6 Support via [babel](https://babeljs.io/) (v7)
* SASS Support via [sass-loader](https://github.com/jtangelder/sass-loader)
