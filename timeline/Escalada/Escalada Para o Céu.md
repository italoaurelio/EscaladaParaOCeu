## Descrição do Projeto

O sistema será utilizado para organizar e gerenciar as escalas de acólitos em paróquias, permitindo um controle mais eficiente das missas e ministérios.

O sistema contará com funcionalidades como cadastro de usuários, aprovação de membros, visualização de calendários e detalhamento de eventos.

  

### Funcionalidades principais:

1. **Cadastro e Login de Usuários**:

   - Realizado inicialmente pelo coordenador do movimento, com aprovação dos membros no sistema.

2. **Gerenciamento de Paróquias e Ministérios**:

   - Coordenadores adicionam paróquias, ministérios e associam membros.

3. **Calendário de Escalas**:

   - Visualização mensal de escalas e missas com detalhes clicáveis.

4. **Aprovação de Usuários**:

   - Coordenador valida os registros para ativar o acesso.

  

---

  

## Checklist de Tarefas

  

### Banco de Dados

- [x] Configurar SQL Server.

- [x] Criar tabelas:

  - `users`

  - `parishes`

  - `ministries`

  - `events`

  - `user_ministries`

- [x] Inserir dados iniciais (se necessário).

  

### Backend

- [ ] Implementar API para CRUD das tabelas.

- [ ] Criar endpoints para:

  - Login e cadastro de usuários.

  - Gerenciamento de paróquias e ministérios.

  - Visualização e cadastro de eventos.

  - Aprovação de usuários.

  

### Frontend

- [ ] Desenvolver página de login/cadastro.

- [ ] Criar interface para coordenadores adicionarem paróquias e ministérios.

- [ ] Integrar calendário com eventos do banco.

- [ ] Desenvolver modal para exibir detalhes dos eventos.

  

### Outros

- [ ] Testar o sistema localmente.

- [ ] Configurar hospedagem na nuvem.

- [ ] Documentar a API e o uso do sistema.

  

---

  

## Paleta de Cores

  

| Elemento          | Cor        | Hex       |

|--------------------|------------|-----------|

| Fundo Principal    | Preto      | `#232323 |

| Fundo Secundário   | Cinza Escuro | `#1E1E1E` |

| Texto Principal    | Branco     | `#FFFFFF` |

| Texto Secundário   | Cinza Claro | `#B0B0B0` |

| Realces (Botões, Links) | Dourado | `#FFC107` |

| Indicadores/Alertas| Vermelho   | `#B22222` |

| Ações Positivas    | Verde Escuro | `#228B22` |

| Navegação          | Azul Profundo | `#1E3A8A` |

  

---

  

## Estrutura do Banco de Dados

  

| Tabela          | Descrição                             | Principais Colunas                              |

|------------------|---------------------------------------|------------------------------------------------|

| **users**        | Armazena informações dos usuários.    | id, name, email, password, is_approved         |

| **parishes**     | Contém os dados das paróquias.        | id, name, location                             |

| **ministries**   | Lista os ministérios da paróquia.     | id, name, parish_id                            |

| **events**       | Detalha os eventos/missas.            | id, title, date, description, parish_id        |

| **user_ministries** | Relaciona usuários aos ministérios. | user_id, ministry_id                           |

  

---

  

## Observações

Este sistema foi pensado para ser prático, com foco na organização e agilidade. As tabelas e estrutura foram criadas para atender às necessidades de escalas e permitir fácil expansão futura.