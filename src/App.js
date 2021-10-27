import React, {useContext, useEffect, useState} from 'react';
import EditorComponent from './EditorComponent';
import { InitDataContext } from './InitialContext';
// import './App.css';

const App = () => {
  const initialData = useContext(InitDataContext);
  const {globalState, dispatch} = initialData;
  const [selectedId, setSelectedId] = useState(0)
  // const [editorData, setEditorData] = useState(globalState?.currentItem?.candidateItemData?.response)

  console.log(globalState.currentItem)

  // const setCandidateData = (newContent) => {
  //   let currentItemResponse = globalState.currentItem;
  //   currentItemResponse.candidateItemData.response = newContent;
  //   console.log(currentItemResponse)
  //   let data = globalState.data;
  //   data[currentItemResponse.index] = currentItemResponse
  //   console.log(data,'data')
  //   // globalState.currentItem.candidateItemData.response = newContent;
  //   // console.log(globalState.currentItem)
  //   // setEditorData(newContent)
  //   // globalState.data[globalState.currentItem.index] = globalState.currentItem;
  //   // console.log(globalState)
  //   // // dispatch({
  //   // //   type: "UPDATE_DATA",
  //   // //   payload: globalState.data
  //   // // })
  //   dispatch({
  //     type: "UPDATE_CURRENT_DATA",
  //     payload: currentItemResponse
  //   })
  //   dispatch({
  //     type: "UPDATE_DATA",
  //     payload: data
  //   })
    
  // }
  

  useEffect(() => {
    dispatch({
      type: "UPDATE_CURRENT_DATA",
      payload: globalState.data[0]
    })
  },[])

//   useEffect(() => {
//   setEditorData(globalState?.currentItem?.candidateItemData?.response)
// }, [globalState?.currentItem])

  return (
    <div className="App">
      {/* <CKEditor
        editor={ClassicEditor}
        data={addData}
        onChange={handleChange}
      /> */}
    <div>
      {globalState.data.map((item, index) => {
        return <button key={item.id} onClick={() => {
          // globalState.currentItem = globalState.data[item.index]
          console.log(item)
          dispatch({
            type: "UPDATE_CURRENT_DATA",
            payload: globalState.data[index]
          })
          // console.log(globalState.data[index], 'item')
          
          // dispatch({
          //   type: "UPDATE_DATA",
          //   payload: globalState.data
          // })
        }}>{index + 1}</button>
      })}
    </div>
      <EditorComponent data={globalState?.currentItem?.candidateItemData?.response} 
      // setData={setCandidateData} 
      id={globalState?.currentItem?.id} />
    </div>
  );
}

export default App;
