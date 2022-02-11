import "./main.css";
import { Component } from "react";

//import components
import PageHeader from "../PageHeader";
import Wrapper from "../Wrapper";
import FitContainer from "../FitContainer";
import EventList from "../EventList";
import EventListItem from "../EventListItem";



class LandingPage extends Component {
  /*constructor() {
    super();
    this.state = { loading: true };
  }
  async componentDidMount() {
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
    {/*if (this.state.loading) {
      return <h2>loading events...</h2>;
    }*/}

    return (
      <Wrapper>
        <PageHeader title="Events" />
        <FitContainer>
          <EventList />
        </FitContainer>
      </Wrapper>
    );
  }
}

export default LandingPage;
