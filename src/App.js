import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


function App() {
  const [text, setText] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show: false, msg: '', type: ''});
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text){
      // set alert
      showAlert(true, 'please enter a value', 'danger')
    } else if (text && isEditing){
      setList(list.map(item=> {
        if (item.id === editId){
          return {...item,title: text};
        }
        return item;
      }))
      setIsEditing(false);
      setEditId(null);
      setText('');
      showAlert(true, 'value changed', 'success')
    } else {
      showAlert(true, 'item added to the list', 'success')
      const newList = {id: new Date().getTime().toString(), title: text};
      setList([...list, newList])
      setText('')
    }
  };

  const showAlert = (show= false, msg= '', type= '') =>{
    return setAlert({show, msg, type});
  }

  const clearList = () => {
    showAlert(true, 'empty list', 'danger');
    setList([])
  }
  const removeItem = (id) =>{
    showAlert(true, 'item removed', 'danger');
    setList(list.filter(item => item.id !== id))
  }
  const editItem = (id) => {
    const newText = list.find(item => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setText(newText.title);
  }
  
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list ={list}/>}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="e.g. eggs" />
          <button type="submit" className="submit-btn">
            {isEditing? 'edit': 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && 
      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem} />
        <button type="button" className="clear-btn" onClick={clearList}>clear items</button>
      </div>
      }
    </section>
  );
};

export default App
