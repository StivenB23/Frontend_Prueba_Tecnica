# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que Next.js utiliza
EXPOSE 3000

# Construye la aplicación
RUN npm run build

# Inicia la aplicación en producción
CMD ["npm", "run", "start"]
