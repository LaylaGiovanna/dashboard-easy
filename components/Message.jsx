// ErrorMessage.js
import React from 'react';



const Message = (props) => {
  const className = props.type === 'error' ? 'text-red-500' : 'text-green-500';

  return <p className={className} role="alert">{props.message}</p>;
};

export default Message;