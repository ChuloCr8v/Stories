import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import dynamic from 'next/dynamic'
import { EditorProps } from 'react-draft-wysiwyg'

class EditorConvertToMarkdown extends Component {
 
  state = {
    editorState: undefined,
  }
  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state;
    const Editor = dynamic<EditorProps>(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
  )
   
    return (
      <div>
        <Editor
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          disabled
           value={editorState && draftToMarkdown(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}