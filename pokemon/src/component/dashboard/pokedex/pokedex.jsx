import "./pokedex.scss";

export const Pokedex = ({
  background = "",
  img = "",
  count = 1,
  name = "",
  type = [],
  typeColor = "",
}) => {
  return (
    <div className="card-box" style={{ "--background": typeColor[0] }}>
      <div className="title">
        <span>{count}</span>
      </div>
      <img className="pokemon-img" src={img} />
      <div className="desc">
        <div className="name" style={{ "--color": typeColor[0] }}>
          {name}
        </div>
        <div className="type">
          {Array.isArray(type) &&
            type.length > 0 &&
            type.map((item, i) => (
              <Type key={i} value={item} typeColor={typeColor} />
            ))}
        </div>
      </div>
    </div>
  );
};

const Type = ({ value, typeColor }) => {
  return (
    <div className="type-box" style={{ "--color": typeColor }}>
      {value}
    </div>
  );
};
