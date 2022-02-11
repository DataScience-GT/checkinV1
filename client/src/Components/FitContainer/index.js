import './main.css';

const FitContainer = (props) => {
    return (
        <div class="fit-container">
            {props.children}
        </div>
    );
}

export default FitContainer;