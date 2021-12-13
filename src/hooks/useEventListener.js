import { useEffect, useRef } from 'react';

const useEventListener = (event, callback) => {
  const ref = useRef();

  useEffect(() => {
    ref.current.addEventListener(event, callback);
    // return () => ref.current.removeEventListener(event, callback);
  }, [event, callback]);
  return ref;
};

export default useEventListener;
