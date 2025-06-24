<br>

<h1>Ingenium</h1>
## Red social para matemáticos e ingenieros

Las explicaciones con tecnicismos resultan confusas para los usuarios principiantes en el tema. Este proyecto propone una solución mediante una plataforma que permite publicar artículos fácilmente y ayuda a redactar con explicaciones claras y precisas, acompañadas de ejemplos. Además, ofrece un aspecto visual atractivo que transmite calma, frescura y belleza, con el objetivo de enganchar al usuario en el tema y mejorar sus resultados en el aprendizaje.

**Habilidades:** Node.js con Express, MongoDB, JavaScript, CSS, HTML, SVG, UI y UX.

<br>

### Ver en vivo

Lo puedes ver [aquí](https://ingeniumedu.onrender.com/)

<br>
<br>

<h2 align="center">Despliegue</h2>

<br>

### Requisitos
* MongoDB  
* Node.js

<br>

### Primera ejecución

1. Instalar las dependencias:
	```bash
	npm install
	```
2. Iniciar MongoDB:
	```bash
	mongod
	```
3. En otra terminal, conectarse a MongoDB para crear la base de datos "biblioteca" y la colección "users":
	```bash
	mongosh
	use biblioteca
	db.createCollection("users")
	```
4. En otra terminal, iniciar el proyecto con:
	```bash
	npm run dev
	```
5. En la barra de direcciones del navegador, ingresar a:
	```
	localhost
	```

<br>

### Después de la primera ejecución

Como ya hemos configurado los aspectos necesarios para ejecutar nuestra web, en las siguientes veces que deseemos iniciar el proyecto, solo debemos hacer lo siguiente:

1. Iniciar MongoDB:
	```bash
	mongod
	```

2. Iniciar el servidor desde la raíz del proyecto:
	```bash
	npm run dev
	```

3. Ingresar a la web desde el navegador:
	```
	localhost
	```

<br>

## Despliegue en la web

1. Usar MongoDB Atlas como base de datos.
2. Configurar MongoDB Atlas para que la base de datos sea accesible desde cualquier IP, agregando la dirección `0.0.0.0/0`.
3. Desplegar el servidor. En este caso se utilizó **Render**, con la opción de `Web Service`. Luego de subir el repositorio, se deben configurar las siguientes variables de entorno:

	* `DB_URI_SRV` – Asignar el valor proporcionado por MongoDB Atlas, por ejemplo:
		```bash
		mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre-db?retryWrites=true&w=majority
		```
	* `NODE_ENV` – Asignar el valor:
		```bash
		production
		```
	* `SESSION_SECRET` – Asignar un valor aleatorio de al menos 20 caracteres, por ejemplo:
		```bash
		DcXKWhuRWIB3xx8Mm3302qEgfcj
		```

<br>
