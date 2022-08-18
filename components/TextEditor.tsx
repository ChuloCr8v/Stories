import React, { Component } from 'react';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic'
import styles from '../styles/TextEditor.module.scss'


const Editor = dynamic(
() => import('react-draft-wysiwyg').then(mod => mod.Editor),
{ ssr: false })  

const EditorConvertToHTML = (props) => {
  
  return (
      <div className={styles.text_editor}>
      <div className={styles.container}>
        <Editor
          editorState={props.editorState}
          wrapperStyle ={{}} 
          toolbarClassName = {styles.toolbar} 
          wrapperClassName={styles.wrapper}
          editorClassName={styles.editor}
          onEditorStateChange={props.onEditorStateChange}
        />
      </div>
      </div>
    );
}

export default EditorConvertToHTML 