import './main.css';

const EventList = (props) => {
    return (
        <table className="list">
            {props.children}
        </table>
    );
}

export default EventList;