import React, { useState, useEffect } from 'react';
import './TreatmentServiceList.css';

const TreatmentServiceList = () => {
    const [terms, setTerms] = useState([]);
    const [filteredTerms, setFilteredTerms] = useState({});
    const [selectedLetters, setSelectedLetters] = useState([]);

    useEffect(() => {
        fetch('./data.json')
            .then((response) => response.json())
            .then((data) => {
                setTerms(data.terms);
                filterTermsByLetters(data.termList, selectedLetters);
            });
    }, [selectedLetters]);

    const filterTermsByLetters = (terms, letters) => {
        const termsGroupedByLetter = terms.reduce((acc, term) => {
            const firstLetter = term.title[0].toUpperCase();
            if (!letters.length || letters.includes(firstLetter)) {
                if (!acc[firstLetter]) {
                    acc[firstLetter] = [];
                }
                acc[firstLetter].push(term);
            }
            return acc;
        }, {});
        setFilteredTerms(termsGroupedByLetter);
    };

    const handleLetterClick = (letter) => {
        setSelectedLetters((prevSelectedLetters) => {
            let updatedLetters;
            if (prevSelectedLetters.includes(letter)) {
                updatedLetters = prevSelectedLetters.filter((l) => l !== letter);
            } else {
                updatedLetters = [...prevSelectedLetters, letter];
            }
            return updatedLetters.sort();
        });
    };

    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    return (
        <div className="terms-list-container">
            <div className="section-header">
                <h2>Treatments, Services and Specialties</h2>


                <div className="alphabet-buttons">
                    {alphabet.map((letter) => (
                        <button
                            key={letter}
                            onClick={() => handleLetterClick(letter)}
                            style={{
                                color: selectedLetters.includes(letter) ? '#3386ff' : '#63686f',
                            }}
                            className='letterbutton'
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
            <div className="tile-container">
                <div className="tile">
                    {Object.keys(filteredTerms).map((letter) => {
                        console.log('filter', filteredTerms, selectedLetters, letter);

                        // Only render if there are terms available for this letter
                        if (filteredTerms[letter] && filteredTerms[letter].length > 0) {
                            return (
                                <div key={letter} className="letterclassification">
                                    <div>{letter}</div>
                                    <hr className="tile-divider" />
                                    <ul className="terms-grid">
                                        {filteredTerms[letter].map((item, index) => (
                                            <li key={item.title}>
                                                <a href={item.link}>{item.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}

                </div>
            </div>
        </div>
    );
};

export default TreatmentServiceList;
