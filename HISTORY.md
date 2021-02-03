# Anotações 

## Brainstorm

Ao ler o desafio da primeira vez pensei em fazer um BFF utilizando GraphQL. Com GraphQL eu teria um endpoint que forneceria os conteúdos de acordo com cada request. Um endpoint serviria para iOS, Android e Web. Lendo um pouco mais o desafio percebi a grande necessidade de cache para o serviço de Agenda. A API de esportes pode ter uma resposta muito lenta e não está preparada para um grande carga. Acredito que adicionar uma camada de cache é muito importa. Atualmente estou pensando em cachear as respostas da esportes API e servir essas respostas cacheadas, principalmente os jogos antigos e os que ainda não aconteceram. Para os jogos em tempo real tenho que ver.

Rascunho da primeira arquitetura:
![](images/globo.jpg)

Refs: 
- https://samnewman.io/patterns/architectural/bff/
- https://thenewstack.io/bffs-developing-nprs-voice-user-interface-with-node-js/