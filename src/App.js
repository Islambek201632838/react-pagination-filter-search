import React, { useState } from 'react';
import './App.css';

const userData = [
  { name: 'Daniel Danny', email: 'danny.daniel@gmail.com', password: 'Pass1234' },
  { name: 'Samuel', email: 'samuel@gmail.com', password: 'Pass1234' },
  { name: 'Jack', email: 'jack@gmail.com', password: 'Pass1234' },
  { name: 'Eureka', email: 'eureka@gmail.com', password: 'Pass1234' },
  { name: 'Pinky', email: 'pinky@gmail.com', password: 'Pass1234' },
  { name: 'Mishti', email: 'mishti@gmail.com', password: 'Pass1234' },
  { name: 'Puneet', email: 'puneet@gmail.com', password: 'Pass1234' },
  { name: 'Nick', email: 'nick@gmail.com', password: 'Pass1234' },
  { name: 'Danika', email: 'danika@gmail.com', password: 'Pass1234' },
  { name: 'Vishakha', email: 'vishakha@gmail.com', password: 'Pass1234' },
  { name: 'Nitin', email: 'ni3@gmail.com', password: 'Pass1234' },
  { name: 'Latika', email: 'latika@gmail.com', password: 'Pass1234' },
  { name: 'Kaavya', email: 'kaavya@gmail.com', password: 'Pass1234' },
  { name: 'Ishika', email: 'ishika@gmail.com', password: 'Pass1234' },
  { name: 'Veronika', email: 'veronika@gmail.com', password: 'Pass1234' },
  { name: 'Daniel Danny', email: 'danny.daniel@gmail.com', password: 'Pass1234' },
  { name: 'Samuel', email: 'samuel@gmail.com', password: 'Pass1234' },
  { name: 'Jack', email: 'jack@gmail.com', password: 'Pass1234' },
  { name: 'Eureka', email: 'eureka@gmail.com', password: 'Pass1234' },
  { name: 'Pinky', email: 'pinky@gmail.com', password: 'Pass1234' },
  { name: 'Mishti', email: 'mishti@gmail.com', password: 'Pass1234' },
  { name: 'Puneet', email: 'puneet@gmail.com', password: 'Pass1234' },
  { name: 'Nick', email: 'nick@gmail.com', password: 'Pass1234' },
  { name: 'Danika', email: 'danika@gmail.com', password: 'Pass1234' },
  { name: 'Vishakha', email: 'vishakha@gmail.com', password: 'Pass1234' },
  { name: 'Nitin', email: 'ni3@gmail.com', password: 'Pass1234' },
  { name: 'Latika', email: 'latika@gmail.com', password: 'Pass1234' },
  { name: 'Kaavya', email: 'kaavya@gmail.com', password: 'Pass1234' },
  { name: 'Ishika', email: 'ishika@gmail.com', password: 'Pass1234' },
  { name: 'Veronika', email: 'veronika@gmail.com', password: 'Pass1234' },
];

function App() {
  const [entries, setEntries] = useState(5);
  const [userDataCopy, setUserDataCopy] = useState([...userData]); // Maintain a copy of the initial data
  const [list, setList] = useState(userData.slice(0, entries));
  const [page, setPage] = useState(1);

  const handleEntries = (e) => {
    const selectedEntries = parseInt(e.target.value, 10);
    setEntries(selectedEntries);
    setList(userDataCopy.slice(0, selectedEntries)); // Use the filtered data if available, otherwise use initial data
    setPage(1);
  }

  return (
    <div className="App container mt-5">
      <h2 className="text-center mb-4">Simple Pagination Example</h2>
      <div className="row justify-content-between mb-3">
        <div className="col-auto" style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ padding: '6px' }}>Show</div>
          <select className="form-select"
            onChange={handleEntries}
            value={entries}
          >
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
          </select>
          <div style={{ padding: '6px' }}>entries</div>
          <div className="col-auto" style={{ display: 'flex', flexDirection: 'row'}}>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                style={{marginLeft:'20px'}}
                onChange={(e) => {
                  const searchValue = e.target.value.toLowerCase();
                  if (searchValue === '') {
                    // If the search input is empty, reset userDataCopy to its initial state
                    setUserDataCopy([...userData]);
                    setList(userData.slice(0, entries));
                  } else {
                    const filteredList = userDataCopy.filter(user => (
                      user.name.toLowerCase().includes(searchValue) ||
                      user.email.toLowerCase().includes(searchValue) ||
                      user.password.toLowerCase().includes(searchValue)
                    ));
                    setList(filteredList.slice(0, entries));
                    setUserDataCopy([...filteredList]); 
                  }
                }}
              />
          </div>
        </div>
      </div>
      <table className="table table-striped table-hover" style={{ maxWidth: '1400px' }}>
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {list.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <div>{`Showing 1 to ${entries} of ${userDataCopy.length} entries`}</div>
        <div>
          {(page > 1 && Math.ceil(userDataCopy.length / entries > 2)) ?
            (<button className="btn btn-primary mx-1"
              onClick={() => {
                const startIndex = (page - 2) * entries;
                const endIndex = (page - 1) * entries;
                setList(userDataCopy.slice(startIndex, endIndex));
                setPage(page - 1);
              }}
            >
              Previous
            </button>) : null
          }
          {Array.from({ length: Math.ceil(userDataCopy.length / entries) }, (_, i) => i + 1).map(item =>
            <button className={`btn btn-primary mx-1 ${item === page ? 'active' : ''}`}
              key={item}
              onClick={() => {
                const startIndex = (item - 1) * entries;
                const endIndex = item * entries;
                setList(userDataCopy.slice(startIndex, endIndex));
                setPage(item);
              }}
            >
              {item}
            </button>
          )}
          {(page < Math.ceil(userDataCopy.length / entries) 
                && Math.ceil(userDataCopy.length / entries > 2)) ?
            (<button className="btn btn-primary mx-1"
              onClick={() => {
                const startIndex = page * entries;
                const endIndex = (page + 1) * entries;
                setList(userDataCopy.slice(startIndex, endIndex));
                setPage(page + 1);
              }}
            >
              Next
            </button>) : null
          }
        </div>
      </div>
      {(list.length===0) ? (<p>No matching records found</p>) : null}
    </div>
  );
}

export default App;