Test Project Beek!
===================

Web mobile para el carrito de compra
Creado por: Juan Felipe Mejía Guerra

----------

Proyecto
-------------
  Instalar: npm install
    (Tiene preinstalador de gulp en modo global)

  Ejecutar: gulp dev
    (ejecutará un servidor en el puerto 8000 con la aplicación localhost:8000)

  Subir a 'producción': gulp release

  Testear: gulp test
    Mostrará en consola los resultados de los tests


- Los Codigos Postales con los que funciona la validación de este son: 20000, 21000 y 28000.
- Las listas de elementos centradas (Libros sugeridos y tiendas) se hicieron con margenes adaptables
  y equidistantes entre si, para conservar el estilo en distintos tamaños de pantalla. (Siempre centrados
  y con el número de elementos y tamaños del diseño)


Tecnologías
-------------


> - React JS -> Framework pedido para realizar el test project, V0.14.2 (Y todos sus plugins en esta misma versión) ¿Por qué esta versión? Porque soy creyente de que el número de la versión no hace un buen producto, había usado esta versión en proyectos anteriores y cumple con lo necesario.
> - Jest JS -> Se usó el framework de pruebas para testear componentes y stores. (En los componentes solo se testea lo necesario, la consistencia de la data se testea en los stores)
> - Gulp -> Se usó gulp como automatizador de tareas debido a que el tamaño del test project no ameritaba una instalación de algo más complejo como webpack.
> Stylus -> Debido a la necesidad de usar precompilador de css y por gusto personal (Sintaxis más amigable que Sass por ejemplo)
> Flux -> ¿Por qué Flux y no Redux? Redux es genial para aplicaciones grandes y complejas, permitiendo la escalabilidad sin crecer en el número de Stores (Como pasaría en flux). Se decidió usar Flux para el test project debido a que usar Redux para éste no aportaría nada a cambio de una implementación más compleja.
> Imagenes en Svg  -> Se decide usar imagenes Svg en la medida de lo posible, por la calidad y la escalabilidad del css sin penalizaciones por los tamaños, etc.
> Lodash -> Al usar datos quemados se tienen listas simples, para manejarlas nos aprovechamos de la optimización que tiene Lodash para el manejo de esta estructura de datos. Con datos reales se recomienda tener estructuras de datos para una mejora considerable del rendimiento de la aplicación.
> Immutable JS -> Manejo de estados que ameritan ser inmutables.
> Eslint -> Eslint para mantener un estandar en el código (Se usaron las reglas de airBnB)



#### Sugerencias basadas en pruebas

Basado en pruebas hechas en el plugin del navegador para ver en tamaños de dispositivos móviles y pruebas en celulares de 5" y de 4.7" realizadas por mi persona y por miembros del equipo CTZEN (Todos con conocimientos avanzados en el manejo de celulares - computadores, edades entre 22-26 años)  se tienen las siguientes sugerencias:

>-  Aumentar el tamaño de las fuentes, se notó dificultad para leer la información de los libros del carrito, la cantidad de cada libro.
>- Aumentar el tamaño del botón "añadir al carrito" en libros sugeridos.
>- Reducir la cantidad de información en el carrito
>- No sacar al usuario del carrito de compras al dar click en la imagen de libros sugeridos (Se les contó a los testers acerca de esto, y todos rechazaron)


#### Sugerencias basadas en comparación con plataformas de compra de libros

Basado en que mi experiencia comprando libros en www.panamericana.com.com www.librerianacional.com

>- La sugerencia de libros la hacen generalmente en más de una parte: En el carrito de compras con los 'libros más vendidos' y antes de proceder al pedido generan un nuevo paso llamado promociones donde le muestran a uno libros 'parecidos' a los que uno ya tiene en el carrito. Ejemplo: Tengo en el carrito añadido Inferno de Dan Brown, en libros sugeridos me sale: La chica del tren, Homo Deus, etc... al darle click en el botón Hacer el pedido me llevaría a una nueva pantalla llamada Promociones donde me saldrían libros como 'El codigo Da Vinci', 'El último Catón', etc...
