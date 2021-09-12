import "./App.css";
import { useState } from "react";
import Axios from "axios";
import Login from "./login"

function App() {
  const [name, setName] = useState("");
  const [priority, setpriority] = useState(0);
  const [status, setstatus] = useState("");
  const [color, setcolor] = useState("");
  const [numaric, setnumaric] = useState(0);

  const [newnumaric, setNewnumaric] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const [email,setEmail]=useState("");
  const [password,SetPasswprd]=useState("");



  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      priority: priority,
      status: status,
      color: color,
      numaric: numaric,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          priority: priority,
          status: status,
          color: color,
          numaric: numaric,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeenumaric = (id) => {
    Axios.put("http://localhost:3001/update", { numaric: newnumaric, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  status: val.status,
                  priority: val.priority,
                  color: val.color,
                  numaric: newnumaric,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };







  return (
    <div className="App">
      <Login />
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>priority:</label>
        <input
          type="number"
          onChange={(event) => {
            setpriority(event.target.value);
          }}
        />
        <label>status:</label>
        <input
          type="text"
          onChange={(event) => {
            setstatus(event.target.value);
          }}
        />
        <label>color:</label>
        <input
          type="text"
          onChange={(event) => {
            setcolor(event.target.value);
          }}
        />
        <label>numaric (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setnumaric(event.target.value);
          }}
        /><div className="addEmployee">
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>priority: {val.priority}</h3>
                <h3>status: {val.status}</h3>
                <h3>color: {val.color}</h3>
                <h3>numaric: {val.numaric}</h3>
              </div>
              <div>
                <input
                  type="text"
                  
                  onChange={(event) => {
                    setNewnumaric(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeenumaric(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}

export default App;
