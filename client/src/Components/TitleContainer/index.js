import './main.css';

const TitleContainer = (props) => {
    return (
        <div className="title-container">
            <h2 className="container-title">{props.title}</h2>
            {props.children}
        </div>
    );
}

export default TitleContainer;