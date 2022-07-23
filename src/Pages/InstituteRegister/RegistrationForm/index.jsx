import React, { useState, useEffect } from "react"
import "./RegistrationForm.scss"
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { convertToHTML } from "draft-convert";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RegistrationForm = () => {

    const handleChange = () => {
        console.log("do nothing");
    }

    const [editorState, setEditorState] = useState({
        speciality: EditorState.createEmpty(),
        experience: EditorState.createEmpty()
    });

    const handleEditorChange = (state, name) => {
        setEditorState({
            ...editorState,
            [name]: state
        });
        convertContentToHTML(state,name);
    };

    const convertContentToHTML = (state,name) => {
        const currentContentAsHTML = convertToHTML(state.getCurrentContent());
        console.log(currentContentAsHTML);
    };


    return (
        <div>
            <div className='institute-profile'>
                <div className='institute-profile-container'>
                    <div>
                        <h3>Profile</h3>
                        <p className='institute-profile-container-message'>Hey, Inst! Let us know about you</p>
                    </div>
                    <div className='name-email'>
                        <div className='name-box'>
                            <h4>Name</h4>
                            <input name='name' onChange={handleChange} type="text" />
                        </div>
                        <div className='email-box'>
                            <h4>Email</h4>
                            <input name='email' readOnly type="text"  />
                        </div>
                    </div>
                    <div>
                        <h4>Tagline</h4>
                        <textarea name="tagline" onChange={handleChange} id="tagline" cols="60" rows="7"></textarea>
                    </div>
                    <div>
                        <h4>Speciality</h4>
                        <Editor
                            editorState={editorState.speciality}
                            onEditorStateChange={(state) => handleEditorChange(state, "speciality")}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                        />
                    </div>
                    <div>
                        <h4>Experience</h4>
                        <Editor
                            editorState={editorState.experience}
                            onEditorStateChange={(state) => handleEditorChange(state, "experience")}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                        />
                    </div>
                    <button className='update-button'>{"Update"}</button>
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm