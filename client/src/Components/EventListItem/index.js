import './main.css';

const EventListItem = (props) => {
    return (
        <tr className="event-list-item">
            <td>{props.name}</td>
            <td>{props.description}</td>
        </tr>
    );
}

export default EventListItem;