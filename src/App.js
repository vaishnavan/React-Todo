import React from 'react';
import { Icon } from 'semantic-ui-react'
import './App.css';

class App extends React.Component {

    constructor(){
      super();
      this.state={
        show:false,
        userName:'',
        storeUser:[],
        isEdit:false,
      }
    }

    handleChange = (e) => {
      this.setState({
        userName:e.target.value,
        show:true
      })
    }

    handlesubmit = (e) => {
      e.preventDefault();
      const {storeUser, userName} = this.state;
      this.setState({
        storeUser: [...storeUser, {id:Date.now(), myName:userName} ],
      })
      
    }

    handleDelete = (id) =>{
      this.setState({
        storeUser: this.state.storeUser.filter((data) => data.id !== id)
      })
    }

    handleEdit = (ind) =>{
      this.setState({
        isEdit:{
          [ind]:!this.state.isEdit[ind]
        }
      })
    }

    

    HandleEditChange = (e, id) =>{
      this.setState({
        storeUser:this.state.storeUser.map(todo => {
          if(todo.id === id){
            todo.myName= e.target.value
          }
          return todo;
        })
      })
    }


    render(){
      const {show, storeUser, isEdit} = this.state;
      return(
        <>
          
          <form>
          <h2 style={{margin:"30px auto", textAlign:"center"}}>Webshine Todo's</h2>
          <div className="myInput_boxmain">
            <div className="myInput_box">
              <input type="text" placeholder="Add Names" onChange={(e)=>this.handleChange(e)} />
            </div>
            <div className="myInput_box">
              <span className={show ? 'active':'deactive'}><Icon name="plus" color="blue" size="large" onClick={this.handlesubmit} /></span>
            </div>
          </div>
          </form>
          
          {storeUser.map((data, i) => {
            return(
              <div key={data.id}>
                {isEdit[i] ?
                <div className="myInput_edit">
                  {/* <h4>{data.id}</h4> */}
                  <div className="myInput_box_edit">
                  <input type="text" value={data.myName} onChange={(e, i)=>this.HandleEditChange(e, data.id)} />
                  </div>
                  
                  <div className="myInput_box_edit">
                  <Icon className="myInput_icon" name="save" color="blue" size="large"  onClick={() => this.handleEdit(i)} />
                  </div>
                </div>
                :
                <div className="myInput_edit">
                {/* <h4>{data.id}</h4> */}
                    <div className="myInput_box">
                      <h2>{data.myName}</h2>
                    </div>
                    <div className="myInput_box_edit">
                    <Icon className="myInput_icon" name="cancel" color="blue" size="large" onClick={()=>this.handleDelete(data.id)} />
                    </div>
                    <div className="myInput_box_edit">
                    <Icon className="myInput_icon" name="edit" color="blue" size="large" onClick={() => this.handleEdit(i)} />
                    </div>
                </div>
                }
              </div>
            )
          })}
        </>
      )
    }
}

export default App;