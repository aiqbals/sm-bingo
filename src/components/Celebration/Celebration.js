import "./Celebration.scss";

const Celebration = ({ circle }) => {
  return (
    <div className="">
      <h2 className="celbtxt"> B I N G O </h2>
      <svg
        className="pulse"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        {circle.map((i) => {
          return <circle key={i} id="Oval" cx="512" cy="512" r="512"></circle>;
        })}
      </svg>
    </div>
  );
};
export default Celebration;
