import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'
import styles from '../styles/TextEditor.module.scss'

const Editor = dynamic(
() => import('react-draft-wysiwyg').then(mod => mod.Editor),
{ ssr: false })  

class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className={styles.text_editor}>
      <div className={styles.container}>
        <Editor
          editorState={editorState}
          wrapperStyle ={{}} 
          toolbarClassName = {styles.toolbar} 
          wrapperClassName={styles.wrapper}
          editorClassName={styles.editor}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
      </div>
    );
  }
}

export default EditorConvertToHTML 