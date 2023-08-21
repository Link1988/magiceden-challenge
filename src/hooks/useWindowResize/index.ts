/* eslint-disable */

import { useEffect, useState } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line
      // @ts-ignore
      function handleResize() {
        setWindowSize({
          // eslint-disable-next-line
          // @ts-ignore
          width: window.innerWidth,
          // eslint-disable-next-line
          // @ts-ignore
          height: window.innerHeight
        });
      }

      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
}
