import React, { useEffect, useState } from 'react';

const List = (props) => {
  const [list, setList] = useState([]);
  const [selectedId, setselectedId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/getList', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        setList(data);
        console.log(data);
      });
  }, []);

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(timestamp).toLocaleString(undefined, options);
  };

  const moveProblem = (id) => {
    console.log("selectedId:", id);
  
    setselectedId(id);
  
    props.setMode('PROBLEM');
    props.setIndex({
      selectedId: id,
    });
  };
  

  return (
    <div>    
      <div className="quiz">
        <div className="problem">
            {list.map((item) => (
                <div
                    key={item.id}
                    className={`selection %{item.id === selectedId ? "selection" : ""}`}
                    onClick={() => moveProblem(item.id)}
                >
                    <p>{formatDate(item.timestamp)}</p>
                </div>
            ))}
        </div>
      </div> 
    </div>
  );
};

export default List;
