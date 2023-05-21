const arrayRandomize=(array) => {
    return array
    .map((c) => ({...c,order:Math.random()}))
    .sort((l,r)=>{
        return l.order-r.order;
    })
}

export default arrayRandomize;