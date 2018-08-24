let dragons = [
  {name: 'd1', element: 'lightning'},
  {name: 'd2', element: 'timewarp'},
  {name: 'd3', element: 'lightning'},
  {name: 'd4', element: 'fire'},
]

const hasElement = (element, obj) => element === obj.element 

const filter = dragons.filter(item => hasElement('fire', item))

console.log(filter)

// const getElementDragons = 
//   element => 
//     dragons.filter(item => item.element === element)

// console.log(getElementDragons('lightning'))
