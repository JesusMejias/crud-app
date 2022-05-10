import { useState } from 'react';
function App() {
  const [employees, setEmployees] = useState([]);
  const [displayBox, setDisplayBox] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [salary, setSalary] = useState('');
  const [position, setPosition] = useState('');
  const [update, setUpdate] = useState(null);
  const addEmployee = () => {
    if (name === '' || address === '' || salary === '' || position === '') {
      console.log('Not enough information has been provided.');
    } else {
      const tempArray = [...employees]
      tempArray.push({
        name,
        address,
        salary,
        position
      })
      setEmployees(tempArray);
      resetValues();
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
  const updateEmployee = index => {
    if (name === '' || address === '' || salary === '' || position === '') {
      console.log('Not enough information has been provided.');
    } else {
      const tempArray = [];
      for (let i = 0; i < employees.length; i++) {
        if (i === index) {
          tempArray.push({
            name,
            address,
            salary,
            position
          })
        } else {
          tempArray.push(employees[i]);
        }
      }
      setEmployees(tempArray);
      setUpdate(null);
      resetValues();
    }
  }
  const resetValues = () => {
    setDisplayBox(false);
    setName('');
    setAddress('');
    setSalary('');
    setPosition('');
  }
  return (
    <main>
      <h1>Employees Database</h1>
      {employees.length > 0 ? null : <p>No employees in the system yet. Do you want to add the first one?</p>}
      <p><button onClick={() => {
        setDisplayBox(true);
        setUpdate(null);
      }}>Add Employee</button></p>
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
          {employees.map((employee, index) => {
            if (update !== null) {
              if (update === index) {
                return (
                  <section className="updating" key={index} onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === 'Return') {
                      e.preventDefault();
                      setName(document.querySelector('#name-edit').innerText);
                      setPosition(document.querySelector('#position-edit').innerText);
                      setAddress(document.querySelector('#address-edit').innerText);
                      setSalary(document.querySelector('#salary-edit').innerText);
                    };
                  }} onKeyUp={e => {
                    setName(document.querySelector('#name-edit').innerText);
                    console.log(document.querySelector('#name-edit').innerText);
                    setPosition(document.querySelector('#position-edit').innerText);
                    setAddress(document.querySelector('#address-edit').innerText);
                    setSalary(document.querySelector('#salary-edit').innerText);
                    if (e.key === 'Enter') updateEmployee(index);
                  }}>
                    <h2><span id="name-edit" contentEditable>{employee.name}</span></h2>
                    <div><b>Position:</b> <span id="position-edit" contentEditable>{employee.position}</span></div>
                    <div><b>Address:</b> <span id="address-edit" contentEditable>{employee.address}</span></div>
                    <div><b>Salary:</b> <span id="salary-edit" contentEditable>{employee.salary}</span></div>
                    <button className="update" onMouseDown={() => {
                      setName(document.querySelector('#name-edit').innerText);
                      setPosition(document.querySelector('#position-edit').innerText);
                      setAddress(document.querySelector('#address-edit').innerText);
                      setSalary(document.querySelector('#salary-edit').innerText);
                    }} onClick={() => updateEmployee(index)}>Update Employee</button><button onClick={() => setUpdate(null)}>Cancel</button><button onClick={() => {
                      setUpdate(null);
                      deleteEmployee(index);
                    }}>Delete</button>
                  </section>
                );
              } else {
                return (
                  <section key={index}>
                    <h2>{employee.name}</h2>
                    <div><b>Position:</b> {employee.position}</div>
                    <div><b>Address:</b> {employee.address}</div>
                    <div><b>Salary:</b> {employee.salary}</div>
                    <button onClick={() => {
                      setDisplayBox(false);
                      setUpdate(index);
                    }}>Edit</button> <button onClick={() => deleteEmployee(index)}>Delete</button>
                  </section>
                );
              }
            } else {
              return (
                <section key={index}>
                  <h2>{employee.name}</h2>
                  <div><b>Position:</b> {employee.position}</div>
                  <div><b>Address:</b> {employee.address}</div>
                  <div><b>Salary:</b> {employee.salary}</div>
                  <button onClick={() => {
                    setDisplayBox(false);
                    setUpdate(index);
                  }}>Edit</button> <button onClick={() => deleteEmployee(index)}>Delete</button>
                </section>
              );
            }
          }
          )}
        </>
        : null}
    </main>
  );
}

export default App;