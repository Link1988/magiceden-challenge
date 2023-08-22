import { useState } from 'react';

type CardProps = {
  img?: string
  title?: string
  price?: string
}

export default function Card({
  img,
  title,
  price,
}: CardProps): JSX.Element {

  const [loaded, setLoaded] = useState<boolean>(false);

  const onImageLoaded = () => setLoaded(true);
  const loadingStyles = !loaded ? { display: 'block' } : { display: 'none' };
  const imgStyles = loaded ? { display: 'inline-block' } : { display: 'none' };

  return (
    <div className='w-full'>
      <div className="block bg-white shadow-md rounded-lg">
        <div
          className="rounded-lg h-[574px] sm:h-[304px] md:h-[496px] lg:h-[368px] xl:h-[280px] bg-gray-400 w-full object-cover object-center"
          style={loadingStyles}
        />
        <img
          className="w-full rounded-t-lg"
          src={img}
          alt=""
          onLoad={onImageLoaded}
          style={imgStyles}
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">${price}</p>
        </div>
      </div>
    </div>
  );
}
