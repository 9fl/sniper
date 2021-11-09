
# Sniper

> Un bot facil de instalar para mostrar reacciones eliminadas, mensajes borrados y editados.

## Instalacion

Es necesario tener instalada una version de Node.js superior a 16.6.0

0. Para verificar la version de node:

```bash
$ node --version
```

1. Abre la terminal en el directorio:

```bash
$ git clone https://github.com/9fl/sniper.git
$ cd ./sniper
```

2. Crea config.json:

```json
{
	"token": "<El token de tu bot>",
	"application_id": "<El ID de tu aplicacion>"
}
```

3. Instalacion:

```bash
$ npm i
$ npm run register [id del servidor que quieras que este el bot]
$ npm run bot
```

Nota:
Si no especificas [guild id], el comando snipe estara disponible en todos los servidores del bot. El bot se iria haciendo mas lento, pero se actualizara cada hora 
(debido al cache de Discord).

Si especificas [guild id] el comando snipe solo estara disponible en el servidor con la ID que has especificado. Se actualizara al instante.

## Licencia

[MIT](https://tldrlegal.com/license/mit-license)
