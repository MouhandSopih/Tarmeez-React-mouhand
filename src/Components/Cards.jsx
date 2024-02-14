import "./Card.css";

export default function Cards(props) {
  
  return (
    <div className="CardBodyStyle">
      <div class="card">
        <img  className="CardImge" src={props.imgC}/>
        <h1 style={{marginTop:"0px"}}>{props.titleC}</h1>
        <h9>{props.dataC} {props.rmzC}</h9>
        <div class="card__content">
          <h1 class="card__description">{props.bodyC}
          </h1>
        </div>
      </div>
    </div>
  );
}
