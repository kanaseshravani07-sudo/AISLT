function FutureEnhancements() {
  const enhancements = [
    {
      number:"01",
      title:"Word Recognition",
      text:"Combine individual alphabet predictions to recognize complete words."
    },
    {
      number:"02",
      title:"Sentence Translation",
      text:"Extend the system from alphabet recognition to complete ISL sentence translation."
    },
    {
      number:"03",
      title:"Real-Time Continuous Translation",
      text:"Allow users to sign continuously without manually requesting a prediction for every gesture."
    },
    {
      number:"04",
      title:"Text-to-Speech",
      text:"Convert recognized translations into natural speech for easier communication."
    },
    {
      number:"05",
      title:"Expanded ISL Vocabulary",
      text:"Add more commonly used Indian Sign Language gestures beyond the alphabet."
    },
    {
      number:"06",
      title:"Improved Model Accuracy",
      text:"Train with more diverse users, lighting conditions, backgrounds and hand orientations."
    },
    {
      number:"07",
      title:"Mobile Application",
      text:"Extend SignBridge to Android and iOS for portable sign language recognition."
    },
    {
      number:"08",
      title:"Two-Way Communication",
      text:"Create a system that can convert spoken language or text back into visual sign language."
    }
  ];
  return (
    <div className="page">
      <section className="page-header">
        <span className="eyebrow">ROADMAP</span>
        <h1>Where SignBridge goes next.</h1>
        <p>
          These are the capabilities we plan to develop
          beyond the current alphabet recognition system.
        </p>
      </section>
      <section className="roadmap">
        {enhancements.map((item)=>(
          <div className="roadmap-item" key={item.number}>
            <div className="roadmap-number">
              {item.number}
            </div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
            <div className="roadmap-arrow">→</div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default FutureEnhancements;