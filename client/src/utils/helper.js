export const getIdxById = (array, id) => {
    return array.map( item => item._id ).indexOf(id);
}