const store = require('../../../store/dummy');
const TABLA = 'user';

function list() {
  return store.list(TABLA);
};



module.exports = function (store = require('../../../store/dummy')) {

  /* function list(){
    return store.list(TABLA);
  }; */

  /* function get(id){
    return store.get(TABLA,id);
  }; */

  /* function create(data){
    return store.upsert(TABLA,data);
  } */

  return {
    list: () => {
      return store.list(TABLA)
    },
    get: (id) => {
      return store.get(TABLA, id);
    },
    create: (data) => {
      return store.upsert(TABLA, data);
    },
    delete:(id)=>{
      return store.remove(TABLA,id);
    }
  }
}
