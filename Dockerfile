# Usa a imagem oficial do Node.js
FROM node:22.9.0

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/api

# Copia os arquivos do projeto para o container
COPY . .
COPY ./.env.production .env

# Instala as dependências
RUN npm install --quiet --no-optional --no-fund --loglevel=error
RUN npm run build

# Expõe a porta do NestJS (ajuste conforme necessário)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
