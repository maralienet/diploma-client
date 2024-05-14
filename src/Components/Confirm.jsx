import React from "react";

function Confirm({ txt, confirm, cancel }) {
    return (
        <div className="overlay">
            <div className="errorMsg">
                <div className="msgText">
                    {txt}
                </div>
                <div className="OKBtn">
                    <button type='button' onClick={confirm}>Да</button>
                    <button type='button' onClick={cancel}>Нет</button>
                </div>
            </div>
        </div>
    );
}

export default Confirm;