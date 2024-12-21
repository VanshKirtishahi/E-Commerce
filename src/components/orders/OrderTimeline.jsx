import PropTypes from 'prop-types';

function OrderTimeline({ events }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Order Timeline</h3>
      <div className="relative">
        {events.map((event, index) => (
          <div key={index} className="flex items-start mb-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-brand-accent mt-2" />
              {index !== events.length - 1 && (
                <div className="h-full w-0.5 bg-gray-200 absolute ml-1" 
                     style={{ top: '1rem', height: '2rem' }} />
              )}
            </div>
            <div className="ml-4">
              <p className="font-medium">{event.status}</p>
              <p className="text-sm text-gray-600">
                {new Date(event.timestamp).toLocaleString()}
              </p>
              {event.note && (
                <p className="text-sm text-gray-600 mt-1">{event.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

OrderTimeline.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      note: PropTypes.string
    })
  ).isRequired
};

export default OrderTimeline; 