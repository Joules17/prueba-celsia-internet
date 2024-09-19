# Descripción de la solución

Se implementó la REST API en Golang con ayuda del framework de gorm para manejar la base de datos a traves de un ORM que utilice dos modelos: Cliente y Servicio.

## Configuración

## Despliegue

En el docker-compose se montaron 3 servicios:

- postgres como base de datos SQL ya que el modelo de datos a implementar es relacional.
- PGAdmin como herramienta de gestion y para realizar pruebas al modelo creado por el ORM.
- API, imagen creada del api implementado que depende del servicio de postgres y espera a que este haya sido inicializado para asi no tener problemas al momento de conectarse.

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

Si el contenedor fue montado con éxito, el REST API estará expuesto al puerto 8080
