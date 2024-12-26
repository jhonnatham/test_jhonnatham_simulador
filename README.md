# Orquestador proyecto

Este repositorio permite configurar un entorno de trabajo Local para la prueba de desarrolo montando una base de datos local (postgresql), el servicio back (node + express) y un servicio front (react + vite) en modo develop

## Installation

1. Arrancar contenedores
```bash
#!/bin/bash

# arrancar contenedor
docker-compose up -d --build
```

### Notas
- Se requiere tener libre los puertos (5432, 5000, 4000). sise desea modificar alguno de los puertos modificar el archivo .env indicando el cambio

- Se demora un poco la descarga y construccion inicial de los contenedores, debido a que se descargan dependencias y se monta la BD. Si se desea montar por fuera el script de  la BD debe crear la base de datos.

- Si se llegna a modificar alguno de los accesos se puede modificar directamente el archivo .env

- Cabe la posibilidad que en desarrollo no se actualice inmediatamente algun cambio sobre el componente en ese caso reinicie el respectivo contenedor

- En caso de desear modificar el schema initial se encuentra en la carpeta sql