import React from 'react';

const WhatsAppFloatingButton = ({ shopNumber }) => (
  <a
    href={`https://wa.me/${shopNumber}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-5 right-5 bg-[#25D366] hover:bg-[#1DA851] text-white p-4 rounded-full shadow-lg z-50 transition-transform transform hover:scale-110"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.52 3.48A11.71 11.71 0 0012 0C5.373 0 .001 5.372.001 12a11.7 11.7 0 002.292 7.16L0 24l4.968-2.293A11.972 11.972 0 0012 24c6.627 0 12-5.373 12-12 0-3.204-1.21-6.201-3.48-8.52zM12 22.056a10.02 10.02 0 01-5.36-1.552l-.384-.227-2.944 1.358 1.36-3.578-.232-.39A10.015 10.015 0 012.024 12C2.024 6.478 6.478 2.024 12 2.024S21.976 6.478 21.976 12c0 5.522-4.454 9.976-9.976 9.976zm5.408-7.536l-1.488-.688a.56.56 0 00-.512 0l-.896.456a4.106 4.106 0 01-1.904.496 3.86 3.86 0 01-2.312-.768 3.203 3.203 0 01-1.36-1.712 4.06 4.06 0 01-.352-1.792 4.332 4.332 0 01.56-1.744l.376-.616a.56.56 0 00-.048-.632l-1.064-1.376a.56.56 0 00-.672-.144l-1.52.616a.56.56 0 00-.336.576c0 3.104 2.24 6.288 5.6 7.024a4.837 4.837 0 002.464.048 4.108 4.108 0 001.984-.816l1.616-1.104a.56.56 0 00.112-.768z"/>
    </svg>
  </a>
);

export default WhatsAppFloatingButton;
