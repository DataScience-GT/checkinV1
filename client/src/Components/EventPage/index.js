import "./main.css";
import { Component } from "react";
import { withRouter } from "react-router-dom";

//import components
import PageHeader from "../PageHeader";
import Wrapper from "../Wrapper";
import FitContainer from "../FitContainer";
import EventDetails from "../EventDetails";

class EventPage extends Component {
  /*constructor() {
    super();
    //this.state = { loading: true };
  }
  /*async componentDidMount() {
    //process.env.REACT_APP_CHECKIN_API_KEY
    const res = await fetch(
      `https://dry-ridge-34066.herokuapp.com/api/${process.env.REACT_APP_CHECKIN_API_KEY}/event/list`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.data));
  }*/
  //get a list of elements
  //use effect/usestate

  render() {
    {
      /*if (this.state.loading) {
      return <h2>loading events...</h2>;
    }*/
    }
    let identifier = this.props.match.params.identifier;
    return (
      <Wrapper>
        <PageHeader title="Event Details" />
        <FitContainer>
          <EventDetails identifier={identifier} />
        </FitContainer>
      </Wrapper>
    );
  }
}

export default withRouter(EventPage);
