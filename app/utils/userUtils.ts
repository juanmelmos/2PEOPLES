export const getIdUser = (): number => {
  if (typeof window !== "undefined") {
    const storedIdUser = localStorage.getItem('idUser');
    return storedIdUser ? parseInt(storedIdUser, 10) : 0;
  }
  return 0;
};