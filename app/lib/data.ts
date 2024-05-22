let idUser= 0;

export function getId() : number{
  return idUser;
}

export function setId(id:number) {
  idUser = id;
}

export function isLogged() {
  return getId()===0 ? true : false;
}