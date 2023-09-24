import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';



type CopyButtonProps = {
    textToCopy: string;
};

const CopyButton = ({ textToCopy }: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);

        // Reset the "Copied" state after a few seconds (optional)
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <div className="justify-content items-center">
            <button
                aria-label="Copy to clipboard"
                className={`btn ${isCopied ? 'btn-success' : 'btn-neutral-content btn-sm'}`}
                onClick={copyToClipboard}
                disabled={isCopied}
            >
                <FontAwesomeIcon icon={faCopy} />
            </button>
            {isCopied && <span className="text-success">Text copied to clipboard!</span>}
        </div>
    );
};

export default CopyButton;




