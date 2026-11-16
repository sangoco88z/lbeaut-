"use client";

import { useId, useRef, useState } from "react";

export function SmsRequest({ phone, message }: { phone: string; message: string }) {
  const fieldId = useId();
  const field = useRef<HTMLTextAreaElement>(null);
  const [feedback, setFeedback] = useState("");
  const sms = "sms:" + phone;

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setFeedback("Message copié.");
    } catch {
      field.current?.focus();
      field.current?.select();
      setFeedback("Le texte est sélectionné. Copiez-le depuis votre appareil.");
    }
  }

  return (
    <div className="sms-request">
      <a className="button" href={sms + "?body=" + encodeURIComponent(message)}>Envoyer un SMS</a>
      <details className="sms-fallback">
        <summary>Le message ne se préremplit pas ?</summary>
        <label htmlFor={fieldId}>Message à copier</label>
        <textarea id={fieldId} ref={field} value={message} readOnly rows={3} />
        <div className="sms-fallback-actions">
          <button className="quiet-link" type="button" onClick={copy}>Copier le message</button>
          <a className="quiet-link" href={sms}>Ouvrir les SMS</a>
        </div>
        <p role="status">{feedback}</p>
      </details>
    </div>
  );
}
