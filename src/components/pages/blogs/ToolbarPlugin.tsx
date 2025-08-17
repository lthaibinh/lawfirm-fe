"use client";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, FORMAT_ELEMENT_COMMAND } from 'lexical';
import { FC } from 'react';

export const ToolbarPlugin: FC = () => {
  const [editor] = useLexicalComposerContext();

  const formatText = (format: import('lexical').TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format);
  };

  const formatElement = (format: import('lexical').ElementFormatType) => {
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format);
  };

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle image upload similar to the original AIEditor
        const formData = new FormData();
        formData.append("file", file);
        formData.append("metaData", `{"height":456}`);
        
        try {
          const response = await fetch("http://localhost:8888/api/v1/file-service/files", {
            method: "post",
            headers: { Accept: "application/json" },
            body: formData,
          });
          const result = await response.json();
          
          // Insert image into editor
          editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
              // Insert image node here
              // This would need to be implemented with a custom image node
            }
          });
        } catch (error) {
          console.error('Image upload failed:', error);
        }
      }
    };
    input.click();
  };

  return (
    <div className="editor-toolbar">
      <button
        onClick={() => formatText('bold')}
        className="toolbar-item spaced"
        aria-label="Format text as bold"
      >
        <i className="format bold" />
      </button>
      <button
        onClick={() => formatText('italic')}
        className="toolbar-item spaced"
        aria-label="Format text as italics"
      >
        <i className="format italic" />
      </button>
      <button
        onClick={() => formatText('underline')}
        className="toolbar-item spaced"
        aria-label="Format text to underlined"
      >
        <i className="format underline" />
      </button>
      <button
        onClick={() => formatText('strikethrough')}
        className="toolbar-item spaced"
        aria-label="Format text with a strikethrough"
      >
        <i className="format strikethrough" />
      </button>
      <button
        onClick={() => formatText('code')}
        className="toolbar-item spaced"
        aria-label="Format text as code"
      >
        <i className="format code" />
      </button>
      <button
        onClick={() => formatElement('left')}
        className="toolbar-item spaced"
        aria-label="Left align"
      >
        <i className="format left-align" />
      </button>
      <button
        onClick={() => formatElement('center')}
        className="toolbar-item spaced"
        aria-label="Center align"
      >
        <i className="format center-align" />
      </button>
      <button
        onClick={() => formatElement('right')}
        className="toolbar-item spaced"
        aria-label="Right align"
      >
        <i className="format right-align" />
      </button>
      <button
        onClick={() => formatElement('justify')}
        className="toolbar-item"
        aria-label="Justify align"
      >
        <i className="format justify-align" />
      </button>
      <button
        onClick={insertImage}
        className="toolbar-item spaced"
        aria-label="Insert image"
      >
        <i className="format image" />
      </button>
    </div>
  );
};
