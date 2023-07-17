const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
    {parts.map(part => <Part key={part.id} part={part}></Part>)}
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
    <Header course={course.name}></Header>
    <Content parts={course.parts}></Content>
    <Total sum={course.parts.reduce((accumulator, elem) => accumulator+=elem.exercises, 0)}></Total>
    </>
  )
}

export default Course