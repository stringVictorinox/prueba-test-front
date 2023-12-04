## COMANDOS PARA SUBIR EL PROYECTO

Se usaron estos comandos para subir tanto el FRONT como el BACK a GitHub.

- `git init` (Este comando inicializa un nuevo repositorio Git).
- `git add .` (Este comando añade todos los archivos del directorio de trabajo al área de preparación).
- `git commit -m "first commit"` (Este comando realiza un commit con los cambios que has agregado al área de preparación).
- `git remote add origin https://github.com/NOMBRE_USUARIO/NOMBRE_PROYECTO.git` (Este comando establece una conexión remota llamada "origin" en el repositorio).
- `git push -u origin master` (Este comando envía tus cambios al repositorio remoto en GitHub).


## CÓMO ABRIR EL FRONT-END

Debes posicionarte en la carpeta 'prueba-test' que es donde está el FRONT-END.

Debemos instalar las dependencias del proyecto:

``` (Cualquiera de las 3 opciones funciona si tienes instalado previamente el gestor de paquetes).
npm: npm install
yarn: yarn install
pnpm: pnpm install
```

Corre uno de los siguientes comandos:

```
npm run dev
yarn dev
pnpm dev
```

Abre [http://localhost:3001] en tu navegador para ver los resultados.

¡Listo! Ahora deberías tener el front-end en ejecución y accesible en tu navegador local.
