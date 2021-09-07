import { useCallback, useLayoutEffect, useState } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/markdown/markdown";
import "codemirror/lib/codemirror.css";
import "./index.css";

function NoteEditor({ notes, activeNoteId, saveNote }) {
  const [codeEditorHeight, setCodeEditorHeight] = useState(0);
  const currentNote = notes[activeNoteId];

  const handleUpdate = useCallback(
    (editor) => saveNote({ text: editor.getValue() }),
    [saveNote]
  );

  useLayoutEffect(() => {
    const currentEditorHeight =
      document.querySelector(".CodeMirror-sizer").clientHeight;
    if (codeEditorHeight !== currentEditorHeight) {
      setCodeEditorHeight(currentEditorHeight);
    }
  });

  return (
    <div className="note-editor">
      <CodeMirror
        key={activeNoteId}
        value={currentNote.text}
        onUpdate={handleUpdate}
        options={{
          mode: "markdown",
          lineWrapping: true,
        }}
      />
      <div className="note-editor__hint" style={{ top: codeEditorHeight }}>
        Total length: {currentNote.text.length}
      </div>
    </div>
  );
}

export default NoteEditor;
