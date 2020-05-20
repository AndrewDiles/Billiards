import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  // console.log('callbackcallbackcallbackcallbackcallbackcallback',callback)
  // console.log('delaydelaydelaydelaydelaydelaydelaydelaydelaydelay',delay)
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => {
        console.log('useInterval return triggered');
        clearInterval(id);
      }
    }
  }, [delay]);
}
export default useInterval;