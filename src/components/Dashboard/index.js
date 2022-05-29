import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context';
import CallApi from '../../hooks/callApi';
import './index.scss';

const Dashboard = () => {
  const { login } = useContext(GlobalContext);

  console.log(login);
  const { fetchData, error } = CallApi();
  const [data, setData] = useState([]);
  const [database, setDatabase] = useState({});
  const [selectedDatabase, setSelectedDatabase] = useState('');

  const getAllDatabase = async () => {
    const url = 'http://localhost/database';
    const databases = await fetchData(url, 'post', {
      id: 'abcdef',
    });
    console.log(databases);
    setData(databases);
  };

  useEffect(() => {
    getAllDatabase();
  }, []);

  const handleOnClickDatabase = async (item) => {
    const url = 'http://localhost/getDatabase';
    const res = await fetchData(url, 'post', {
      id: 'abcdef',
      database: item.database,
    });
    setSelectedDatabase(item.database);
    setDatabase(res);
  };

  const handleAddData = async () => {
    const url = 'http://localhost/insert';
    const keys = Object.keys(database.schema);
    const objectCreate = {};
    const data = keys.map((key) => (objectCreate[key] = database.data[0][key]));

    const res = await fetchData(url, 'post', {
      id: 'abcdef',
      database: selectedDatabase,
      data: objectCreate,
    });
    setDatabase(res);
  };

  const renderTable = () => {
    const keys = Object.keys(database.schema);
    return (
      <table className='table'>
        <thead className='table-head'>
          <tr>
            <td className='table-head-row'>sl</td>
            {keys.map((item, i) => {
              return (
                <td className='table-head-row' key={i}>
                  {item.toLocaleUpperCase()}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody className='table-body'>
          {database.data.map((item, i) => {
            return (
              <tr key={i} className='table-body-row'>
                <td className='table-body-row-data'>{i + 1}</td>
                {keys.map((key, i) => {
                  return (
                    <td className='table-body-row-data' key={i}>
                      {item[key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className='dashboard'>
      <div className='dashboard-sidebar'>
        <div className='dashboard-sidebar-header'>All Database</div>
        <ul className='dashboard-db'>
          {data &&
            data.map((item, i) => {
              return (
                <li key={i} onClick={() => handleOnClickDatabase(item)}>
                  {item.database}
                </li>
              );
            })}
        </ul>
      </div>
      <div className='dashboard-body'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
            marginBottom: '1rem',
          }}
        >
          <button onClick={handleAddData}>Add Data</button>
        </div>
        {database.schema && database.data && renderTable()}
      </div>
    </div>
  );
};

export default Dashboard;
