# Orquestador proyecto

Este repositorio permite configurar un entorno de trabajo Local para la prueba de desarrolo montando una base de datos local (postgresql), el servicio back (node + express) y un servicio front (react + vite) en modo develop

## Installation

1. Arrancar contenedores
```bash
#!/bin/bash

# arrancar contenedor
docker-compose up -d --build
```

2. Cuando el contenedor termine de instalar dependencia y cargar por complerto el aplicativo, en el navegador de su preferencia ingresar a la URL
http://localhost:4000/


### Notas
- Se requiere tener libre los puertos (5432, 5500, 4000). sise desea modificar alguno de los puertos modificar el archivo .env indicando el cambio

- Se demora un poco la descarga y construccion inicial de los contenedores, debido a que se descargan dependencias y se monta la BD. Si se desea montar por fuera el script de  la BD debe crear la base de datos.

- Si se llegan a modificar alguno de los accesos se deben actualizar directamente los archivos .env

- Cabe la posibilidad que en desarrollo no se actualice inmediatamente algun cambio sobre el componente en ese caso reinicie el respectivo contenedor

- En caso de desear modificar el schema initial se encuentra en la carpeta sql
