# Plano de Testes de Usabilidade


Os testes de usabilidade permitem avaliar a qualidade da interface com o usuário da aplicação interativa. Este plano de testes busca definir possíveis critérios para realização de teste futuros.


## Objetivos Principais Dos Testes


|ID    | Descrição do Requisito                                                     | Prioridade |
|------|----------------------------------------------------------------------------|------------|
|RF-001| O sistema deve permitir ao usuário cadastrar, editar e deletar atividades. |    ALTA    | 
|RF-002| O sistema deve permitir a consulta do progresso de atividades.             |    ALTA    | 


## Perfil De Usuários Para Testes


Para todo ciclo de testes definimos o perfil de usuários de testes como aqueles indivíduos que possuem a  necessidade de organizar seus estudos e tarefas diárias.


## Equipamentos e Softwares Utilizados Para os Testes


* Computadores ou Celulares
* Possuir conexão com a Internet e acesso aos principais navegadores.


## Atividades Planejadas Para o Usuário

Os participantes do teste serão os membros do grupo e o objetivo das atividades será de encontrar quaisquer dificuldades que os usuários encontrarem durante a utilização da aplicação.


### Teste - 1 - Usabilidade da Página de Login - Entrar na conta


O usuário se encontra na página principal da aplicação, simule clicar nos botões de Login, um pop up deve abrir se nao digitar nada no campo de Login. Se digitar o nome será salvo e seguiremos
pára a proxima pagina.


#### Possíveis Problemas Encontrados

    • O nome nao foi salvo;
    • Os botões não foram responsivos;
    • O pop-up de login não apareceu.
    
### Teste - 2 - Criando Colunas

Clicando no botão um modal irá abrir solicitando que defina o nome da coluna, se o usuario nao clicar em "salvar" um alera aparece informando que não foi possivel criar a coluna e que ele deverá digitar alguma coisa para que possa continuar. 

Existe um limitador dentro do compo de criar coluna com 16 caracteres para que o nome nao fique muito grande. Caso o usuario tente digitar mais do que isso nao será possivel. Ao digitar qualquer coisa dentro da regra d 16 caracteres e clicar em "Salvar a Coluna é criada. Caso queira retirar a coluna, no campo inferior existe um botão de remover coluna que ao clicar, a mesma será apagada

Também é possivel clicar no botão "Fechar" dentro modal se desistir de criar uma coluna.


#### Possíveis Problemas Encontrados

    • O modal não aparece;
    • os botões nao estão responsivos;
    • O alerta não aparece;
    • O limitador de 16 caracteres não funciona;
    • A coluna não é criada;
    • A Coluna nao será excluida. 
    
    
### Teste - 3 - Criação de Tarefas

Para a criação de tarefas existe um campo no qual você pode digitar a tarefa que você tem que cumprir, ao clicar no botão "+" e não descrevere qual será a tarefa, aparecerá um alerta informando que é necessario digitar algo para continuar. Ao digitar a tarefa a mesma aparecera no corpo da coluna com duas funções sendo elas um "V" e um "X".

A função do botão "V" é garantir visualmente que a tarefa foi cumprida durante o dia e a função "X" seria de exclusão de tarefa caso ela tenha sido inserida de forma erada.

#### Possíveis Problemas Encontrados

    • O usuario nao consegue adicionar a tarefa;
    • O usuario nao consegue concluir a taref;
    • O usuario nao consegue excluir a tarefa.

