import withData from "../src/components/withData";

// Speakers component using Higher Order Component to supply data
const Speakers = ({ speakers }) => {
  return (
    <div>
      {speakers.map(({ imageSrc, name }) => {
        return (
          <img src={`images/${imageSrc}.jpg`} alt={name} key={imageSrc}></img>
        );
      })}
    </div>
  );
};

export default withData(2)(Speakers);
