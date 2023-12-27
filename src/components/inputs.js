

function Inputs(props) {
  
  const addData = (dataName, data, inputKeyName) => {
    if (data.split(' ').join('')) props.setAddedDatas({...props.addedDatas, [dataName]:[...props.addedDatas[dataName], data]});
    props.setInputs({...props.inputs, [inputKeyName]:{...props.inputs[inputKeyName], inputValue:''}})
  }

  const enterKey = (e, dataName, data, inputKeyName) => {
    if(e.key === 'Enter' && props.inputs[inputKeyName].isPlural){
      addData(dataName, data, inputKeyName);
    };
  }

  const inputChange = (e, keyName) => {
    props.setInputs({...props.inputs, [keyName]:{...props.inputs[keyName], inputValue: e.target.value}})
    if (! props.inputs[keyName].isPlural) props.setAddedDatas({...props.addedDatas, [props.inputs[keyName].addDataName]: e.target.value})
  }

  const inputFile = (e, keyName) => {
    props.setInputs({...props.inputs, [keyName]:{...props.inputs[keyName], inputValue: e.target.files[0]}})
    if (! props.inputs[keyName].isPlural) props.setAddedDatas({...props.addedDatas, [props.inputs[keyName].addDataName]: e.target.files[0]})
  }


  return(
    <div className="inputs">
      {
        Object.keys(props.inputs).map((keyName) => {
          return(
            <div key={keyName} className="inputBox">
              <span className="inputName">{props.inputs[keyName].name}</span>
              {
                props.inputs[keyName].type === 'default' || props.inputs[keyName].type === 'password'
                ?
                <input type={props.inputs[keyName].type} value={props.inputs[keyName].inputValue} onChange={(e) => {inputChange(e, keyName)}} onKeyUp={(e) => {enterKey(e, props.inputs[keyName].addDataName, props.inputs[keyName].inputValue, keyName)}} />
                :
                null
              }

              {
                props.inputs[keyName].type === 'file'
                ?
                <input type={props.inputs[keyName].type} onChange={(e) => {inputFile(e, keyName)}} onKeyUp={(e) => {enterKey(e, props.inputs[keyName].addDataName, props.inputs[keyName].inputValue, keyName)}} />
                :
                null
              }
              
              {
                props.inputs[keyName].type === 'select' 
                ?
                <select value={props.inputs[keyName].inputValue} onChange={(e) => {inputChange(e, keyName)}} onKeyUp={(e) => {enterKey(e, props.inputs[keyName].addDataName, props.inputs[keyName].inputValue, keyName)}} >
                  <option value={null} style={{color: 'gray'}}>{props.inputs[keyName].name} 선택하세요</option>
                  {props.inputs[keyName].selectMenus.map((selectMenu) => {return(<option key={selectMenu} value={selectMenu}>{selectMenu}</option>)})}
                </select>
                :
                null 
              }

              {
                props.inputs[keyName].type === 'textarea'
                ?
                <textarea value={props.inputs[keyName].inputValue} onChange={(e) => {inputChange(e, keyName)}} onKeyUp={(e) => {enterKey(e, props.inputs[keyName].addDataName, props.inputs[keyName].inputValue, keyName)}}/>
                :
                null
              }

              {
                props.inputs[keyName].type === 'checkbox'
                ?
                props.inputs[keyName].checkList.map((checkbox, idx) => {
                  return(
                    <div key={idx} className="checkbox">
                      <input id={"checkbox"+keyName+idx} type={"checkbox"} value={checkbox} checked={checkbox === props.inputs[keyName].inputValue} onClick={(e) => {
                        var value = e.target.checked? e.target.value: '' ; 
                        props.setInputs({...props.inputs, [keyName]:{...props.inputs[keyName], inputValue: value}}); 
                        props.setAddedDatas({...props.addedDatas, [props.inputs[keyName].addDataName]: value});
                      }} />
                      <span onClick={() => {document.getElementById("checkbox"+keyName+idx).click()}}>{checkbox}</span>
                    </div>
                  )
                })
                :
                null
              }

              {
                props.inputs[keyName].type === 'date'
                ?
                <div className="dateInput">
                <input type={'date'} onChange={(e) => {props.setAddedDatas({...props.addedDatas, [props.inputs[keyName].addDataName[0]]: new Date(e.target.value)})}} />
                <span>~</span>
                <input type={'date'} onChange={(e) => {props.setAddedDatas({...props.addedDatas, [props.inputs[keyName].addDataName[1]]: new Date(e.target.value)})}} />
                </div>
                :
                null
              }

              {
                props.inputs[keyName].isPlural
                ?  
                <button className="addBtns" onClick={() => {addData(props.inputs[keyName].addDataName, props.inputs[keyName].inputValue, keyName)}}>추가</button>
                :
                null
              }
              
              {
                props.inputs[keyName].isPlural
                ?
                <div className="addedDatas">
                {
                  props.addedDatas[props.inputs[keyName].addDataName][0] ?
                  props.addedDatas[props.inputs[keyName].addDataName].map((addedData,idx) => {
                    return (
                      <span key={idx} className="addedDataBox">
                        <span className="addedData">{addedData}</span>
                        <button className="delBtn" onClick={() => {props.setAddedDatas({...props.addedDatas, [props.inputs[keyName].addDataName]:props.addedDatas[props.inputs[keyName].addDataName].filter((del) => del !== addedData)})}}>x</button>
                      </span>
                    )
                  }):
                  null
                }
                </div>
                :
                null
              } 
          </div>
          )
        })
      }
      {/* <div className="inputBox">
        <span className="inputName">등록일</span>
        <input type={"date"}/> ~ <input type={"date"} />
      </div>
      <button className="searchBtn" onClick={() => {search()}}>검색</button> */}
    </div>
  )
}
export default Inputs;