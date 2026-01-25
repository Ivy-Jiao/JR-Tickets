import "./Card.css"

const Card = (obj) => (
    <div className="card">
       {obj.content}
    </div>
);

export default Card;