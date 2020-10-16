# Upload Service
O serviço tem como objetivo realizar uploads de arquivos para o S3. Foi desenvolvido utilizando Node e MySQL. Caso seja necessário utilizar outro SGBD, basta instalar o adptador correto e mudar o campo `SEQUELIZE_DIALECT` no aruqivo `.env`.

### Instalação

Há duas formas de rodar o sistema, através de um container docker ou na própria máquina:

#### Instalação Nativa
Instalar as dependências:
```sh
$ npm install
```
Renomear o arquivo de ambiente:
```sh
$ mv .env-sample .env
```
Preencher as informações necessárias no arquivo ```.env```:
```env
APP_URL=
AUTH_URL=
#Configuração da Database
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=
DB_PORT=
SEQUELIZE_DIALECT= #valores possíveis: 'mysql','mariadb','sqlite','postgres','mssql'
# Configuração AWS
BUCKET_NAME=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SIGNATURE_VERSION= #usar sempre "v4"
BUCKET_REGION=
PRESIGNED_URL_EXPIRATION_TIME_IN_SECONDS= #min: 1, max: 604800 
```
Para iniciar o sistema, executar o comando
```sh
$ npm start
```
#### Instalação via Docker
É necessário preencher o arquivo ```.env``` da mesma forma que na instalação nativa. Depois, construir a imagem a partir do ```Dockerfile``` na raiz do projeto:
```sh
$ docker build --no-cache=true --tag solar_upload_service:1.0 .
```
Agora, levantar o container com:
```sh
$ docker run -d -p <HOST_PORT>:3000 --name=<CONTAINER_NAME> solar_upload_service:1.0 
```

### Utilização
São expostas 4 rotas:

```GET /files/:project_id```: retorna todos os arquivos referentes ao projeto identificado por ```project_id``` e que não foram marcados como deletados. 

```GET /file/:id```: retorna uma URL pré assinada para download do arquivo identificado por ```id```, caso esse não tenha sido marcado como deletado. 

```POST /files```: recebe os seguintes parametros como form/multi-part:
 - project_id: INT identificando o projeto
 - category_id: INT identificando a categoria
 - file_description: STR com uma descrição do arquivo
 - file: o próprio arquivo

Retorna o ```id``` do arquivo salvo.

```DELETE /files/:id```: marca como deletado o arquivo identificado por ```id```

