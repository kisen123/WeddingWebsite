import { useState } from "react";
import "./QBlock.scss";
import { ABlock } from "./ABlock.tsx";

export function QBlock({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="qaSection__block">
            <div
                className={`qBlockClickable ${isOpen ? "qBlockClickable--open" : ""}`}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <h2 className="question">{question}</h2>

                <span className="qBlockClickable__icon" aria-hidden="true">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9 6L15 12L9 18" />
                    </svg>
                </span>
            </div>
            <ABlock answer={answer} isOpen={isOpen} />
        </div>
    );
}