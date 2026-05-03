// Markdown parsing utility (XSS-safe)
export function parseMarkdown(text) {
  if (!text || typeof text !== 'string') return text;

  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline text-blue-600">$1</a>'
  );
  html = html.replace(/\n\n+/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  if (html.includes('</p><p>')) {
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><\/p>/g, '').replace(/<p>\s*<\/p>/g, '');
  }
  html = html.replace(/^[\s]*[-*]\s+(.+)/gm, '<li>$1</li>');
  html = html.replace(/^[\s]*\d+\.\s+(.+)/gm, '<li>$1</li>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  return html;
}
