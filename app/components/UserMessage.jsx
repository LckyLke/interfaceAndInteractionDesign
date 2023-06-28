const UserMessage = ({ text }) => {
  return (
    <div className="text-right">
      <div className="inline-block p-2 my-1 rounded-lg max-w-lg break-words mr-1 userMessage message">
        {text}
      </div>
    </div>
  );
};

export default UserMessage;
