import { useState } from "react";
import { Link } from "react-router";
import "./PageButton.scss";

export function PageButton({ text, to }: { text: string, to: string }) {
    const [clicking, setClicking] = useState(false);

    function handleClick() {
        setClicking(true);
        setTimeout(() => setClicking(false), 400);
    }

    return (
        <Link
            className={`page-button${clicking ? " page-button--clicking" : ""}`}
            to={to}
            onClick={handleClick}
        >
            {text}
        </Link>
    );
}