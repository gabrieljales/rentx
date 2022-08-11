import fs from "fs";

export const deleteFile = async (filename: string) => {
  try {
    // Verifica se o arquivo existe
    await fs.promises.stat(filename);
  } catch (error) {
    // Se der erro, simplesmente sai
    return;
  }
  // Remove o arquivo de acordo com o filename passado
  await fs.promises.unlink(filename);
};
