import React, { useEffect, useRef, useState } from "react";
import "./KeywordSlider.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const KeywordSlider = ({ keywords }) => {
    const sliderRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateButtons = () => {
        const track = sliderRef.current;
        if (!track) return;

        const maxScrollLeft = track.scrollWidth - track.clientWidth;
        setCanScrollLeft(track.scrollLeft > 1);
        setCanScrollRight(track.scrollLeft < maxScrollLeft - 1);
    };

    const scrollByAmount = (direction) => {
        const track = sliderRef.current;
        if (!track) return;

        const amount = Math.max(180, track.clientWidth * 0.8);
        track.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    };

    useEffect(() => {
        updateButtons();

        const track = sliderRef.current;
        if (!track) return;

        track.addEventListener("scroll", updateButtons, { passive: true });
        window.addEventListener("resize", updateButtons);

        return () => {
            track.removeEventListener("scroll", updateButtons);
            window.removeEventListener("resize", updateButtons);
        };
    }, [keywords]);

    if (!keywords || keywords.length === 0) return null;

    return (
        <div className="keyword-slider-container">
            <h3>Palavras-chave</h3>
            <div className="slider-wrapper">
                <button
                    type="button"
                    className="slider-btn left"
                    onClick={() => scrollByAmount("left")}
                    disabled={!canScrollLeft}
                    aria-label="Ver palavras-chave anteriores"
                >
                    <FaChevronLeft />
                </button>
                <div className="slider-track" ref={sliderRef}>
                    {keywords.map((palavra) => (
                        <span key={palavra.id} className="keyword-tag">
                            {palavra.name}
                        </span>
                    ))}
                </div>
                <button
                    type="button"
                    className="slider-btn right"
                    onClick={() => scrollByAmount("right")}
                    disabled={!canScrollRight}
                    aria-label="Ver mais palavras-chave"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default KeywordSlider;
