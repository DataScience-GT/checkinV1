import './main.css';

//import components
import PageHeader from "../PageHeader";
import Wrapper from "../Wrapper";
import FitContainer from '../FitContainer';
import EventList from '../EventList';
import EventListItem from '../EventListItem';

const LandingPage = () => {
    //get a list of elements
    //use effect/usestate

    return (
        <Wrapper>
            <PageHeader title="Events" />
            <FitContainer>
                <EventList>
                    <EventListItem name="Name" description="Description"/>
                    <EventListItem name="event 1" description="aksjf kdfjdkslf jksdljfldks f"/>
                    <EventListItem name="event 2" description="sdklj fkldsjflkjdsklfjldks jfl jsd"/>
                </EventList>
            </FitContainer>
        </Wrapper>
    );
};

export default LandingPage;