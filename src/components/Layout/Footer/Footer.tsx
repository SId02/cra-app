
import React, { useState, useEffect } from "react";

const Footer: React.FC = () => {
    const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="main-footer bg-gray-200 text-center py-4">
            <div className="container mx-auto">
                <div className="footer-copyright">
                    <p className="text-gray-800">2022 - {currentYear} React App</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
