import "./ABlock.scss";

export function ABlock({ answer, isOpen }: { answer: string; isOpen: boolean }) {
    return (
        <div className={`answerBlock ${isOpen ? "answerBlock--open" : ""}`} aria-hidden={!isOpen}>
            <div className="answerBlock__text">
                {answer}
            </div>
        </div>
    );
}
