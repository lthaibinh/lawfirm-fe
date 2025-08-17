"use client"; 
import { IUploadFileRes } from "@/types/api";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { $getRoot, $getSelection, EditorState } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ToolbarPlugin } from './ToolbarPlugin';
import './LexicalEditor.css';

// Theme configuration
const theme = {
  ltr: 'ltr',
  rtl: 'rtl',
  paragraph: 'editor-paragraph',
  quote: 'editor-quote',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
    h4: 'editor-heading-h4',
    h5: 'editor-heading-h5',
  },
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listitem',
  },
  image: 'editor-image',
  link: 'editor-link',
  text: {
    bold: 'editor-text-bold',
    italic: 'editor-text-italic',
    underline: 'editor-text-underline',
    strikethrough: 'editor-text-strikethrough',
    underlineStrikethrough: 'editor-text-underlineStrikethrough',
    code: 'editor-text-code',
  },
  code: 'editor-code',
  codeHighlight: {
    atrule: 'editor-tokenAttr',
    attr: 'editor-tokenAttr',
    boolean: 'editor-tokenProperty',
    builtin: 'editor-tokenSelector',
    cdata: 'editor-tokenComment',
    char: 'editor-tokenSelector',
    class: 'editor-tokenFunction',
    'class-name': 'editor-tokenFunction',
    comment: 'editor-tokenComment',
    constant: 'editor-tokenProperty',
    deleted: 'editor-tokenProperty',
    doctype: 'editor-tokenComment',
    entity: 'editor-tokenOperator',
    function: 'editor-tokenFunction',
    important: 'editor-tokenVariable',
    inserted: 'editor-tokenSelector',
    keyword: 'editor-tokenAttr',
    namespace: 'editor-tokenVariable',
    number: 'editor-tokenProperty',
    operator: 'editor-tokenOperator',
    prolog: 'editor-tokenComment',
    property: 'editor-tokenProperty',
    punctuation: 'editor-tokenPunctuation',
    regex: 'editor-tokenVariable',
    selector: 'editor-tokenSelector',
    string: 'editor-tokenSelector',
    symbol: 'editor-tokenProperty',
    tag: 'editor-tokenProperty',
    url: 'editor-tokenOperator',
    variable: 'editor-tokenVariable',
  },
};

// Error handler
function onError(error: Error) {
  console.error(error);
}

// Custom onChange plugin
function MyOnChangePlugin({ onChange }: { onChange: (val: string) => void }) {
  const [editor] = useLexicalComposerContext();
  
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const root = $getRoot();
        const selection = $getSelection();
        // Convert to HTML or markdown as needed
        // For now, we'll use the editor state JSON
        onChange(JSON.stringify(editorState.toJSON()));
      });
    });
  }, [editor, onChange]);
  
  return null;
}

type LexicalEditorProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (val: string) => void;
  options?: any;
};

export const MarkdownEditor: FC<LexicalEditorProps> = ({
  placeholder,
  defaultValue,
  value,
  onChange,
  options,
}) => {
  const [editorState, setEditorState] = useState<string>('');

  const handleChange = (newEditorState: string) => {
    setEditorState(newEditorState);
    if (onChange) {
      onChange(newEditorState);
    }
  };

  const initialConfig = {
    namespace: 'MarkdownEditor',
    theme,
    onError,
    editorState: defaultValue ? JSON.parse(defaultValue) : undefined,
  };

  return (
    <div className="h-[calc(100vh-200px)]">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="lexical-editor">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor-input"
                  aria-placeholder={placeholder || 'Enter some text...'}
                  placeholder={
                    <div className="editor-placeholder">
                      {placeholder || 'Enter some text...'}
                    </div>
                  }
                />
              }
              placeholder={
                <div className="editor-placeholder">
                  {placeholder || 'Enter some text...'}
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <MyOnChangePlugin onChange={handleChange} />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};
