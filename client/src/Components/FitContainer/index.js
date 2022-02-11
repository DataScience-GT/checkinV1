import './main.css';

const FitContainer = (props) => {
    return (
        <div className="fit-container">
            {props.children}
        </div>
    );
}

export default FitContainer;