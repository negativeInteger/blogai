export default async function copyToClipboard(text: string, type: string) {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      console.log(`${type} copied to clipboard`);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };