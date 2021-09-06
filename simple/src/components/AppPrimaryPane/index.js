import { Avatar, Button } from "@material-ui/core";
import { AvatarGroup } from "@material-ui/lab";
import { useState } from "react";
import { useSelector } from "react-redux";
import fakeApi from "../../utils/fakeApi";
import NoteEditor from "../NoteEditor";
import NoteView from "../NoteView";
import "./index.css";

function Authors() {
  const activeThisMonth = useSelector((state) =>
    state.users.filter((i) => i.lastActiveDate.includes("2021-10"))
  );

  return (
    <div className="primary-pane__authors">
      <div className="primary-pane__authors-last-active">
        {activeThisMonth.length} users active this month:{" "}
        {activeThisMonth.map((i) => i.name).join(", ")}
      </div>
      <AvatarGroup max={2}>
        <Avatar src="/avatar1.jpg" />
        <Avatar src="/avatar2.jpg" />
        <Avatar src="/avatar3.jpg" />
      </AvatarGroup>
    </div>
  );
}

function AppPrimaryPane({ activeNoteId, notes, saveNote }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [publishedAt, setPublishedAt] = useState(null);

  const togglePublic = async () => {
    setIsLoading(true);

    if (isPublic) {
      await fakeApi.setPublicStatus(false);
      setIsPublic(false);
    } else {
      await fakeApi.setPublicStatus(true);
      const publishedDate = await fakeApi.getPublishedDate();
      setIsPublic(true);
      setPublishedAt(publishedDate.toLocaleTimeString());
    }

    setIsLoading(false);
  };

  if (!activeNoteId) {
    return (
      <div className="primary-pane__empty-editor">
        <div className="primary-pane__eyes"></div>
        <div className="primary-pane__eyes-caption">
          Select a note to start editing
        </div>
      </div>
    );
  }

  return (
    <div className="primary-pane">
      <div className="primary-pane__header">
        <h1>Editor</h1>
        <Authors />
      </div>

      <div className="primary-pane__content">
        <div className="primary-pane__controls">
          <Button
            variant="outlined"
            onClick={togglePublic}
            disabled={isLoading}
          >
            {isLoading
              ? "Loading..."
              : isPublic
              ? "🤫 Make Private"
              : "👀 Make Public"}
          </Button>
          {!isLoading && isPublic && <span>Published at: {publishedAt}</span>}
        </div>
        <NoteEditor
          saveNote={({ text, date }) => saveNote(activeNoteId, { text, date })}
          notes={notes}
          activeNoteId={activeNoteId}
        />
        <div className="primary-pane__view">
          <NoteView text={notes[activeNoteId].text} />
        </div>
      </div>
    </div>
  );
}

export default AppPrimaryPane;
