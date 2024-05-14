import React from "react";

function ErrorMessage({ msg, close }) {
    return (
        <div className="overlay">
            <div className="errorMsg">
                <div className="close" onClick={close}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 16" stroke="#9E9E9E" strokeWidth="2"></path>
                        <path d="M1 16L16 1" stroke="#9E9E9E" strokeWidth="2"></path>
                    </svg>
                </div>
                <div className="msgText">
                    {msg}
                </div>
                <div className="OKBtn">
                    <button onClick={close}>OK</button>
                </div>
            </div>
        </div>
    );
}

export default ErrorMessage;