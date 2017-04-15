Mattelsa Parking!
===================

Frontend para la administración del parqueadero
Creado por: Juan Felipe Mejía Guerra

----------

Proyecto
-------------
  Instalar: npm install
    (Tiene preinstalador de gulp en modo global)

  Ejecutar: gulp dev
    (ejecutará un servidor en el puerto 8000 con la aplicación localhost:8000)

  Subir a 'producción': gulp release

  Testear: npm test
    Mostrará en consola los resultados de los tests


- Los usuarios se crean al dar click en el logo de mattelsa en la pagina inicial.


Tecnologías
-------------


> - React JS -> Framework elegido por gusto, V0.14.2 (Y todos sus plugins en esta misma versión) ¿Por qué esta versión? Porque soy creyente de que el número de la versión no hace un buen producto, había usado esta versión en proyectos anteriores y cumple con lo necesario.
> - Jest JS -> Se usó el framework de pruebas para testear componentes y stores. (En los componentes solo se testea lo necesario, la consistencia de la data se testea en los stores)
> - Gulp -> Se usó gulp como automatizador de tareas debido a que el tamaño del test project no ameritaba una instalación de algo más complejo como webpack.
> - Stylus -> Debido a la necesidad de usar precompilador de css y por gusto personal (Sintaxis más amigable que Sass por ejemplo)
> - Flux -> ¿Por qué Flux y no Redux? Redux es genial para aplicaciones grandes y complejas, permitiendo la escalabilidad sin crecer en el número de Stores (Como pasaría en flux). Se decidió usar Flux para el test project debido a que usar Redux para éste no aportaría nada a cambio de una implementación más compleja.
> - Lodash -> Al usar datos quemados se tienen listas simples, para manejarlas nos aprovechamos de la optimización que tiene Lodash para el manejo de esta estructura de datos. Con datos reales se recomienda tener estructuras de datos para una mejora considerable del rendimiento de la aplicación.
> - Eslint -> Eslint para mantener un estandar en el código (Se usaron las reglas de airBnB)
