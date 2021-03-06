import React from 'react';
import PropTypes from 'prop-types';
import { compareAsc } from 'date-fns';
import ResultsCard from './ResultsCard';

function Results(props) {
  const {
    isLoading,
    data,
    error,
  } = props;

  if (isLoading) {
    return <div className="loading">Loading results...</div>;
  }

  if (error) {
    return <div className="notification is-warning">{error}</div>;
  }

  return (
    <div className="results">
      <p>Sorted by departure time</p>
      {data.departures.sort((x, y) => {
        return compareAsc(new Date(x.departure_time), new Date(y.departure_time));
      }).map(departure => (
        <ResultsCard
          departureTime={departure.departure_time}
          departureLocation={data.locations.find(x => x.id === departure.origin_location_id)}
          arrivalTime={departure.arrival_time}
          arrivalLocation={data.locations.find(x => x.id === departure.destination_location_id)}
          price={departure.prices.total / 100}
          currency={departure.prices.currency}
          operator={data.operators.find(x => x.id === departure.operator_id)}
          link={departure.links.deeplink}
        />
      ))}
    </div>
  );
}

Results.defaultProps = {
  isLoading: true,
  data: {},
  error: null,
};

Results.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    origin_city_id: PropTypes.string,
    destination_city_id: PropTypes.string,
    cities: PropTypes.array,
    locations: PropTypes.array,
    operators: PropTypes.array,
    departures: PropTypes.array,
    complete: PropTypes.bool,
    ttl: PropTypes.number,
    is_valid_route: PropTypes.bool,
  }),
  error: PropTypes.string,
};

export default Results;
