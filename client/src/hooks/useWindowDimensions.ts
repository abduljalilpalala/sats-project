import { useState, useEffect } from 'react';

type Dimensions = {
  innerWidth: number
  innerHeight: number
}

const useWindowDimensions = (): any => {
  if (typeof window !== "undefined") {
    const [windowDimensions, setWindowDimensions] = useState<Dimensions>({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    });

    useEffect(() => {
      const handleResize = () => {
        setWindowDimensions({ innerWidth: window.innerWidth, innerHeight: window.innerHeight });
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
  }
}

export default useWindowDimensions;
