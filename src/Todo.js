import React, { useState,useEffect} from 'react';
import "./style.css";

//get local storagedata

const getLocalData =()=>{
  const List =localStorage.getItem("mytodo")

  if (List){
    return JSON.parse(List)
  }else{
    return []
  }
}

 

const Todo = () => {
  const [inputdata, setInputdata] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [iseditItem, setEditItem] = useState("");
  const [toggleButton,setToggleButton]= useState(false)

  //add items
  const addItem = () => {
    if (!inputdata) {
      alert("enter something");
    } else if (inputdata && toggleButton){
      setItems(
        items.map((item)=>{
          if(item.id=== iseditItem){
            return {...item,name:inputdata}
          }
          return item
        })
      );
    setInputdata("");
    setEditItem(null);
    setToggleButton(false)
    }else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputdata("");
      
    }
  };


  //delete item
  const deleteItem = (index) => {
    const updatedItems = items.filter((item) => {
      return item.id !== index;
    });
    setItems(updatedItems);
  };


  //edit item
  const editItem = (index) => {
    const item_todo_edited = items.find((item) => {
      return item.id === index;
    });
    setInputdata(item_todo_edited.name);
    setEditItem(index);
    setToggleButton(true)
   
  };


  //adding  localStorage
  useEffect(() => {
    localStorage.setItem("mytodo", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./todo.svg" alt="todo image" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Items"
              className="form-control"
              value={inputdata}
              onChange={(e) => setInputdata(e.target.value)}
            />
            {toggleButton ? (
              <i
                className="far fa-edit add-btn"
                onClick={() => {
                  addItem();
                }}
              ></i>
            ) : (
              <i
                className="fa fa-plus add-btn"
                onClick={() => {
                  addItem();
                }}
              ></i>
            )}
          </div>
          {/*show all Items*/}
          <div className="showItems">
            {items.map((item) => (
              <div className="eachItem" key={item.id}>
                <h3>{item.name}</h3>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => editItem(item.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(item.id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>

          {/*remove all Items*/}

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={() => setItems([])}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;