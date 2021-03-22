<h1 align="center">
  📅 Agenda Globe Esporte ⚽
</h1>
	
<p align="left">
  <a href="README.md">README</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="HISTORY.md">HISTORY </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="TODO.md">TODO</a>&nbsp;&nbsp;&nbsp;
</p>

## Índice
- [Projeto](#📋-projeto)
- [Pré-requisitos](#📄-pré-requisitos)
- [Configuração](#⚙️-configuração)
- [Rodar aplicação](#▶️-rodar-aplicação)
- [Testar aplicação](#🧪-testar-aplicação)
  - [Testes unitários](#testes-unitários)
  - [Testes de integração](#testes-de-integração)
  - [Teste de carga](#testes-de-carga)
- [Tecnologias](#👨‍💻-Tecnologias)


## 📋 Projeto

- BFF (backend for frontend) que retorna agenda de jogos de acordo com dia.
<br><br>
  
<p align="center">
  <img alt="App home" src="images/ge.png"/>
</p>

<br>

<br>

## 📄 Pré-requisitos

- [Node.js](https://nodejs.org/pt-br/download/)
- [Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-pt)

## ⚙️ Configuração

### 1. Clonar repositório

```bash
# Digite o comando abaixo para clonar o repositŕio
$ git clone https://github.com/osergioneto/SergioDeusdedith.git
```

### 2. Instalar dependências
```bash
# Vá para a pasta do repositório
$ cd SergioDeusdedith

# Instale as dependências
$ npm i
```

### 3. Instalar Redis
```bash
# Levanta container com redis
$ docker run --name redis -p 6379:6379 -d -t redis:alpine 
```

## ▶️ Rodar aplicação

### Em modo de desenvolvimento
```bash
# Executa servidor com Nodemon + TS-Node
$ npm run dev
```

### Em modo produção
```bash
# Compila e roda aplicação usando Docker + PM2
$ npm start
```

## 🧪 Testar aplicação

### Testes unitários
```bash
$ npm run test:unit
```

### Testes de integração
```bash
# API de Esportes e Redis devem estar rodando
$ npm run test:integration
```

### Testes de carga
```bash
# BFF, Redis e a API de Esportes devem estar rodando
$ npm run test:load
```


## 👨‍💻 Tecnologias

Essas são as tecnologias utilizadas no projeto:

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/) 
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) 
- [Redis](https://redis.io/) 


---

Made by Sérgio Deusdedith 👋 <br>
🔗 [Linkedin](https://www.linkedin.com/in/osergioneto/) <br>
✉ [sergio.deusdedith@gmail.com](mailto:sergio.deusdedith@gmail.com) &nbsp; <br>
