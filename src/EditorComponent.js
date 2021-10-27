import React, { useState, useCallback, useContext } from "react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useEffect } from "react";
import { debounce } from "lodash";
import { InitDataContext } from "./InitialContext";

const EditorComponent = (props) => {
    var abc;
    const initialData = useContext(InitDataContext);
  const {globalState, dispatch} = initialData;
    const [editorData, setEditorData] = useState("");
    // const [editorReady, setEditorReady] = useState(false);

    let toolbar = ["bold", "|", "italic", "|", "Underline", "|", "superScript", "|", "subScript", "|", "numberedList", "|", "bulletedList", "|", "outDent", "|", "inDent", "|", "specialCharacters"];

    const setCandidateData = (newContent) => {
        let currentItemResponse = globalState.currentItem;
        currentItemResponse.candidateItemData.response = newContent;
        console.log(currentItemResponse)
        let data = globalState.data;
        data[currentItemResponse.index] = currentItemResponse
        console.log(data,'data')
        // globalState.currentItem.candidateItemData.response = newContent;
        // console.log(globalState.currentItem)
        // setEditorData(newContent)
        // globalState.data[globalState.currentItem.index] = globalState.currentItem;
        // console.log(globalState)
        // // dispatch({
        // //   type: "UPDATE_DATA",
        // //   payload: globalState.data
        // // })
        dispatch({
          type: "UPDATE_CURRENT_DATA",
          payload: currentItemResponse
        })
        dispatch({
          type: "UPDATE_DATA",
          payload: data
        })
        
      }

    const editorConfig = {
        toolbar: toolbar,
        language: props.language,
        enterMode: CKEditor.ENTER_DIV,
        isReadOnly: true
    }

    console.log(props.data)

    // const editorTextChangehandler = (editor) => {
    //     const data = editor.getData();
    //     // onChange(data)
    //     setEditorData(data);
    // }

    useEffect(() => {
        setEditorData(props.data || "")
    },[props.data])

    const debounceMethod = (editor) => {
        
        if(abc) {
            clearTimeout(abc);
        }
        abc = setTimeout(function() {
            const data = editor.getData();
            
            setCandidateData(data)
            // props.dispatch({type:"DISABLE_SUBMIT", payload: false})
        // onChange(data)
        // setEditorData(data);
        }, 800);
    }

    // const editorTextChangehandlerDebounced = useCallback(debounce(editorTextChangehandler, 50), []);

    return (
        <React.Fragment>
                        {/* <textarea value={"<p>abc</p>" + editorData} onChange={e => setEditorData(e.target.value)} /> */}
                        {/* <div contentEditable="true" value={editorData} onChange={e => {
                            console.log('easdas')
                            setEditorData(e.target.value)
                        }}></div> */}
                        <CKEditor
                            // data={""}
                            data={editorData || ""}
                            config={editorConfig}
                            editor={Editor}
                            onReady={(editor) => {
                                console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                // console.log(editor.getData(), event)
                                // setEditorData(editor.getData())
                                // TODO: check 'event' for data
                                // debugger
                                debounceMethod(editor)
                                
                            }}
                            onFocus={(event, editor) => {
                            }}
                            onBlur={(event, editor) => {
                            }}
                            onError={(err, data) => {
                                console.log("CKEditor (1): Error.", err, data);
                            }}     
                        />
                 
        </React.Fragment>
    );
};

export default EditorComponent;
