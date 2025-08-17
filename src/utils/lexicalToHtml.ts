// Utility function to convert Lexical JSON to HTML
export function lexicalToHtml(lexicalJson: string): string {
  try {
    const editorState = JSON.parse(lexicalJson);
    
    if (!editorState.root || !editorState.root.children) {
      return '';
    }

    return convertNodesToHtml(editorState.root.children);
  } catch (error) {
    console.error('Error parsing Lexical JSON:', error);
    return '';
  }
}

function convertNodesToHtml(nodes: any[]): string {
  return nodes.map(node => {
    switch (node.type) {
      case 'paragraph':
        return `<p>${convertTextNodesToHtml(node.children)}</p>`;
      
      case 'heading':
        const level = node.tag || 'h1';
        return `<${level}>${convertTextNodesToHtml(node.children)}</${level}>`;
      
      case 'list':
        const listTag = node.listType === 'number' ? 'ol' : 'ul';
        return `<${listTag}>${convertNodesToHtml(node.children)}</${listTag}>`;
      
      case 'listitem':
        return `<li>${convertTextNodesToHtml(node.children)}</li>`;
      
      case 'quote':
        return `<blockquote>${convertTextNodesToHtml(node.children)}</blockquote>`;
      
      case 'code':
        return `<pre><code>${convertTextNodesToHtml(node.children)}</code></pre>`;
      
      case 'text':
        return convertTextToHtml(node);
      
      default:
        return convertTextNodesToHtml(node.children || []);
    }
  }).join('');
}

function convertTextNodesToHtml(nodes: any[]): string {
  return nodes.map(node => {
    if (node.type === 'text') {
      return convertTextToHtml(node);
    }
    return convertNodesToHtml([node]);
  }).join('');
}

function convertTextToHtml(textNode: any): string {
  let text = textNode.text || '';
  
  // Apply formatting
  if (textNode.format & 1) text = `<strong>${text}</strong>`; // bold
  if (textNode.format & 2) text = `<em>${text}</em>`; // italic
  if (textNode.format & 4) text = `<u>${text}</u>`; // underline
  if (textNode.format & 8) text = `<s>${text}</s>`; // strikethrough
  if (textNode.format & 16) text = `<code>${text}</code>`; // code
  
  return text;
}

// Alternative: Use Lexical's built-in HTML export
export async function lexicalToHtmlUsingLexical(lexicalJson: string): Promise<string> {
  try {
    // This would require importing Lexical's HTML export utilities
    // For now, we'll use the manual conversion above
    return lexicalToHtml(lexicalJson);
  } catch (error) {
    console.error('Error converting Lexical to HTML:', error);
    return '';
  }
}
