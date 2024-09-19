# Descripción de la solución

Se implementó la solución frontend con ayuda de React y la librería de Material UI, en especifico JoyUi. Además se utilizo axios para el manejo de las peticiones a la REST API implementada.

## Configuración

## Despliegue

En el docker-compose se montaro 1 servicio:

- webapp, imagen creada que viene siendo el front del aplicativo.

Para inicializar el contenedor, solo se necesita escribir el comando para construir las imagenes del contenedor:

```
docker-compose build
```

Luego se debe iniciar el contenedor:

```
docker-compose up
```

En caso de hacerlo de necesitarlo detached a la terminal

```
docker-compose up -d
```

Si el contenedor fue montado con éxito, la aplicacion web estará expuesta al puerto 3000
