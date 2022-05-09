import { useState } from 'react';
function App() {
  const [employees, setEmployees] = useState([]);
  const [displayBox, setDisplayBox] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [salary, setSalary] = useState('');
  const [position, setPosition] = useState('');
  const addEmployee = () => {
    if (name === '' || address === '' || salary === '' || position === '') {
      console.log('Not enough information has been provided.')
    } else {
      const tempArray = [...employees]
      tempArray.push({
        name,
        address,
        salary,
        position
      })
      setEmployees(tempArray);
      setDisplayBox(false);
      setName('');
      setAddress('');
      setSalary('');
      setPosition('');
    }
  }
  const deleteEmployee = key => {
    const tempArray = [];
    for (let i = 0; i < employees.length; i++) {
      if (i !== key) {
        tempArray.push(employees[i]);
      }
    }
    setEmployees(tempArray);
  } 
  return (
    <main>
      <h1>Human Resources System</h1>
      {employees.length > 0 ? null : <p>No employees in the system yet. Do you want to add the first one?</p>}
      <p><button onClick={() => setDisplayBox(true)}>Add Employee</button></p>
      {displayBox ? 
      <form onSubmit={e => {
        e.preventDefault(); // This prevents the page from reloading after hitting the Submit button
        e.target.reset(); // This resets the form after hitting the Submit button
      }}>
      <input type="text" required placeholder="Name" onChange={e => setName(e.target.value)} />
      <input type="address" required placeholder="Address" onChange={e => setAddress(e.target.value)} />
      <input type="text" required placeholder="Salary" onChange={e => setSalary(e.target.value)} />
      <input type="text" required placeholder="Position" onChange={e => setPosition(e.target.value)} />
      <button type="submit" onClick={addEmployee}>Submit</button>
      </form>
      : ''}
      {employees.length > 0 ? 
      <>
      {employees.map((employee, index) => 
      <section key={index}>
        <h2>{employee.name}</h2>
        <div><b>Position:</b> {employee.position}</div>
        <div><b>Address:</b> {employee.address}</div>
        <div><b>Salary:</b> $ {employee.salary}</div>
        <button onClick={() => deleteEmployee(index)}>Delete Employee</button>
      </section>
      )}
      </>
      : null}
    </main>
  );
}

export default App;