import { app } from "./app";

const port = process.env.APP_PORT;
app.listen(port, () => console.log(`Server is running on port ${port}!`));

/**
 * Motivo desse arquivo: testes de integração.
 *
 * Quando formos testar, não queremos que o servidor de fato seja inicializado (com o listen), usaremos somente as informações do app (./app)
 */
