import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  // console.log('callback',callback);
  // console.log('delay @ top',delay);
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    // console.log('delay @ bottom',delay);
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