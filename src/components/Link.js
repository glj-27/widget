import React from 'react'

const Link = ({ className, href, children }) => {
  const onClick = (event) => {
    if(event.metakey || event.ctrlKy) {
      return;
    }

    event.preventDefault();
    window.history.pushState({}, '', href);

    const navEvent = new ProgressEvent('popstate');
    window.dispatchEvent(navEvent);
  }
  
  return (
    <a onClick={onClick} className={className} href={href}>
      {children}
    </a>
  );
};

export default Link;