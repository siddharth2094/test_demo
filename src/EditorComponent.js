import React, { useState, useCallback } from "react";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useEffect } from "react";
import { debounce } from "lodash";

const EditorComponent = (props) => {
    var abc;
    const [editorData, setEditorData] = useState("");
    const [editorReady, setEditorReady] = useState(false);

    let toolbar = ["bold", "|", "italic", "|", "Underline", "|", "superScript", "|", "subScript", "|", "numberedList", "|", "bulletedList", "|", "outDent", "|", "inDent", "|", "specialCharacters"];

    

    const editorConfig = {
        toolbar: toolbar,
        language: props.language,
        enterMode: CKEditor.ENTER_DIV,
        isReadOnly: true
    }

    console.log(props.data)

    useEffect(() => {
        console.log(props.data, 'props.data')
        setEditorData(props.data || "")

    }, [props.data]);

    useEffect(() => {
        console.log(props.id)
    },[props.id])

    const editorTextChangehandler = (editor) => {
        const data = editor.getData();
        // onChange(data)
        setEditorData(data);
    }

    const debounceMethod = (editor) => {
        
        if(abc) {
            clearTimeout(abc);
        }
        abc = setTimeout(function() {
            const data = editor.getData();
            
            props.setData(data)
            // props.dispatch({type:"DISABLE_SUBMIT", payload: false})
        // onChange(data)
        // setEditorData(data);
        }, 800);
    }

    const editorTextChangehandlerDebounced = useCallback(debounce(editorTextChangehandler, 50), []);

    return (
        <React.Fragment>
                        {/* <textarea value={"<p>abc</p>" + editorData} onChange={e => setEditorData(e.target.value)} /> */}
                        {/* <div contentEditable="true" value={editorData} onChange={e => {
                            console.log('easdas')
                            setEditorData(e.target.value)
                        }}></div> */}
                        <CKEditor
                            // data={""}
                            data={props.data || ""}
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
