import React from 'react'

//  function T1() {
//   return (
//     <div>T1</div>
//   )
// }

function Child(props) {
  return (
    <div>Hey, Im a {props.name}</div>
  )
}

function ChildHoc(Component) {
  console.log('Component', Component)
  return function Wrap(props) {
    console.log('props', props)
    return <Component {...props}></Component>
  }
}

const NewChild = ChildHoc(Child)

export default function T1() {
  const name = 'Ninjee';
  console.log('first')
  return (
    <NewChild name={name}></NewChild>
  )
}
