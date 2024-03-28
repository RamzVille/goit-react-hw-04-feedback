import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

//Refactor to React Hooks
// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };
export const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });


  // display the total number of collected reviews from all categories
  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback; //this.state;
    return good + neutral + bad;
  };

  // display the percentage of positive reviews
  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback; //this.state;
    const total = countTotalFeedback();  //this.countTotalFeedback();

    // if total is greater than 0, return the positive percentage, else 0
    return total > 0 ? Math.round((good / total) * 100) : 0;
  };

  // update the state when a button is clicked
  // handleClick = type => {
  //   this.setState(prevState => ({
  //     ...prevState,
  //     [type]: prevState[type] + 1,
  //   }));
  // };
  const handleClick = type => {
    setFeedback(prevState => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };


  //  render() { //render is not use here
  //   const { good, neutral, bad } = this.state;
  //   const total = this.countTotalFeedback();
  //   const positivePercentage = this.countPositiveFeedbackPercentage();
  //   const options = ['good', 'neutral', 'bad'];
  const { good, neutral, bad } = feedback;
  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  const options = ['good', 'neutral', 'bad'];

  return (
    <div>
      <Section title="Please leave a feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={handleClick}
        />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
// }