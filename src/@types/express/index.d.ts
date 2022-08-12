// Como o tipo user não existe nas tipagens do express, precisamos sobrescrever essas tipagens adicionando o tipo desejado (user)

declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: {
      id: string;
    };
  }
}
