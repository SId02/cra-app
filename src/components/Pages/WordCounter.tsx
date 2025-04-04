import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

const WordCounter: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [stats, setStats] = useState<{
        characters: number;
        words: number;
        readingTime: number;
    }>({
        characters: 0,
        words: 0,
        readingTime: 0,
    });

    const isWord = (word: string): boolean => {
        return word.split('').some(char => {
            const charCode = char.charCodeAt(0);
            return (
                (charCode > 47 && charCode < 58) || // Numbers
                (charCode > 64 && charCode < 91) || // Uppercase letters
                (charCode > 96 && charCode < 123) // Lowercase letters
            );
        });
    };

    const countWords = useMemo(() => {
        const trimmedText = text.trim();
        const characters = trimmedText.length;

        const words = trimmedText
            .split(/\s+/)
            .filter(word => word !== '' && isWord(word))
            .length;

        const readingTime = parseFloat((words / 100).toFixed(2));

        return { characters, words, readingTime };
    }, [text]);

    useEffect(() => {
        setStats(countWords);
    }, [countWords]);

    const handleReset = () => {
        setText('');
    };

    return (
        <>
            <section className="py-6 bg-gray-100">
                <div className="container mx-auto text-center pb-5">
                    <h1 className="text-4xl font-bold">Word Counter</h1>
                </div>

                <div className="container mx-auto">
                    <nav className="flex justify-around mb-6">
                        {[
                            {
                                label: 'Characters',
                                value: stats.characters,
                                bgClass: 'bg-blue-200'
                            },
                            {
                                label: 'Words',
                                value: stats.words,
                                bgClass: 'bg-yellow-200'
                            },
                            {
                                label: 'Reading Time',
                                value: `${stats.readingTime} min`,
                                bgClass: 'bg-green-200'
                            }
                        ].map((stat, index) => (
                            <div key={index} className="flex-1 p-4 text-center">
                                <div className={`p-4 rounded shadow ${stat.bgClass}`}>
                                    <p className="font-semibold">{stat.label}</p>
                                    <p className="text-xl">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="container mx-auto pt-5">
                    <form className="bg-white p-4 rounded shadow">
                        <div className="mb-4">
                            <textarea
                                className="w-full h-32 p-2 border rounded"
                                placeholder="Type your text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                    </form>

                    <div className="flex justify-center mt-4">
                        <button
                            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                            onClick={handleReset}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </section>
            <footer className="flex justify-center mt-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    Back to Home
                </Link>
            </footer>
        </>
    );
};

export default WordCounter;