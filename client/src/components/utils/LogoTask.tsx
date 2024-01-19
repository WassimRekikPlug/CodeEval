

const LogoTask = ({ letter }: { letter: string }) => {
    const getColorCombination = (letter: string) => {
        const colorMappings: { [key: string]: { backgroundColor: string; textColor: string } } = {
            'A-G': { backgroundColor: '#3498db', textColor: '#ffffff' },
            'H-M': { backgroundColor: '#e74c3c', textColor: '#000000' },
            'N-S': { backgroundColor: '#2ecc71', textColor: '#ffffff' },
            'T-Z': { backgroundColor: '#f39c12', textColor: '#000000' },
            'OTHER': { backgroundColor: '#95a5a6', textColor: '#000000' },
        };

        const letterGroup = getLetterGroup(letter);
        return colorMappings[letterGroup] || colorMappings['OTHER'];
    };

    const getLetterGroup = (letter: string) => {
        const normalizedLetter = letter.toUpperCase();
        if (normalizedLetter >= 'A' && normalizedLetter <= 'G') return 'A-G';
        if (normalizedLetter >= 'H' && normalizedLetter <= 'M') return 'H-M';
        if (normalizedLetter >= 'N' && normalizedLetter <= 'S') return 'N-S';
        if (normalizedLetter >= 'T' && normalizedLetter <= 'Z') return 'T-Z';
        return 'OTHER';
    };

    const colorCombination = getColorCombination(letter);

    return (
        <div style={{
            backgroundColor: colorCombination.backgroundColor,
            color: colorCombination.textColor,
        }} className="p-6 bg-red-700 flex justify-center items-center text-center h-14 w-14 rounded-xl text-3xl">
            {letter}
        </div>
    )
}

export default LogoTask