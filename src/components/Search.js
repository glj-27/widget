import React, {useState, useEffect, Component} from 'react'
import axios from 'axios'

const Search = () => {

  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  {/*useEffect:
    第一个参数：function
      返回值也为一个function 
    第二个参数为：
      - '':在第一次初始化 每次重新渲染时都会执行
      - [] :在第一次初始化渲染时执行
      - [data]：在第一次初始化 每次重新渲染 数据发生变化时
  */}

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout((timerId));
    };
  }, [term]);

  useEffect(() => {
    // 异步函数定义方法
    // 1.定义执行
    const search = async() => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        }
      });

      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm])

  {/*
  // // async定义一个异步函数,有await来返回
  // useEffect(() => {
    
    

  //   // 判断是否时初始化内容
  //   if(term && !results.length) {
  //     search();
  //   } else {
  //     // 设置定时器来延迟搜索
  //     const timeoutId = setTimeout(() => {
  //       // 判断有内容才搜索
  //       if(term){
  //         search();
  //       }
  //     }, 1000);

  //     return () => {
  //       clearTimeout(timeoutId);
  //     }
  //   }
    
  //   {/*
  //   // 2.立即执行
  //   // (async() => {
  //   //   await axios.get("balbalbalbal");
  //   // })();

  //   // 3.
  //   // axios.get('balabala')
  //   //   .then((response) => {
  //   //     console.log(response.data);
  //   //   });
  // *\/}

  // }, [term, results.length])
  */}

  const renderedResults = results.map((result) => {
    return (
      <div className="item" key={result.pageid}>
        <div className="right floated content">
          <a 
            className="ui button"
             href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >Go</a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          {/* 去除消息中的span标签 */}
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
          {/* {result.snippet} */}
        </div>
      </div>
    )
  })

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={e => setTerm(e.target.value)} 
            className="input" 
          />
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  )
}

export default Search;