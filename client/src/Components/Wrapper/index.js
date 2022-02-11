import './main.css';

const Wrapper = (props) => {
    return (
        <div id="wrapper">
            {props.children}
        </div>
    );
};

export default Wrapper;