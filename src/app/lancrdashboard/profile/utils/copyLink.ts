type CopyLinkProps = {
  userUrl: string,
  setCopied: React.Dispatch<React.SetStateAction<boolean>>
}

export async function copyLink({ userUrl, setCopied }: CopyLinkProps) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(userUrl);
    } else {
      // Fallback for mobile browsers
      const textArea = document.createElement("textarea");
      textArea.value = userUrl;
      textArea.style.position = "fixed"; // Prevent scrolling to bottom
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (!successful) throw new Error("Fallback copy failed");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Failed to copy:", err);
  }
}