import "./AlphabetGuide.css";

const letters = [
  "A", "B", "C", "D", "E", "F",
  "G", "H", "I", "J", "K", "L",
  "M", "N", "O", "P", "Q", "R",
  "S", "T", "U", "V", "W", "X",
  "Y", "Z"
];

function AlphabetGuide() {

  return (

    <div className="alphabet-grid">

      {letters.map((letter) => (

        <div
          className="alphabet-card"
          key={letter}
        >

          <div className="alphabet-image">

            {/* Replace this with your actual dataset image */}

            <img
              src={`/alphabet/${letter}.jpg`}
              alt={`ISL sign for ${letter}`}
            />

          </div>

          <div className="alphabet-letter">
            {letter}
          </div>

        </div>

      ))}

    </div>

  );
}

export default AlphabetGuide;