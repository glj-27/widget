import React, {useState, useEffect, useRed, useRef} from 'react';

const DropDown = ({ label, options, selected, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState('red');

  const ref = useRef();

  useEffect(() => {
    const onBodyClcik =  (event) => {
      if(ref.current.contains(event.target)) {
        // 如果点击的时dropdown就返回
        return;
      }
      // 全局的点击
      setOpen(false);
    }

    // 添加全局的click监听
    document.body.addEventListener('click', onBodyClcik);

    return () => {
      // 移除click监听，防止dropdown移除后继续监听
      document.body.removeEventListener('click', onBodyClcik);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    return (
      <div 
        key={option.value} 
        className="item"
        onClick={() => {
          onSelectedChange(option);
          setColor(option.value);
        }}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        {/* <label className="label">Select a Color</label> */}
  <label className="label">{label}</label>
          <div 
            onClick={(event) => {
              setOpen(!open);
              // console.log(event.target.key);
            }}
            className={`ui selection dropdown ${open ? 'visible active' : ''}`}
          >
            <i className="dropdown icon"></i>
            <div className="text">{selected.label}</div>
            <div className={`menu ${open ? 'visible transition' : ''}`}>
              {renderedOptions}
            </div>
          </div>
        </div>
        <div style={{color: color}}>What color am I?</div>
    </div>
  )
};

export default DropDown;
