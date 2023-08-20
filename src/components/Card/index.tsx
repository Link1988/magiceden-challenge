import React, { FunctionComponent, useState } from 'react'

type CardProps = {
  img?: string
  title?: string
  price?: string
  ref?: any
}

const Card: FunctionComponent<CardProps> = React.forwardRef(({
  img,
  title,
  price,
}, ref: any): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const onImageLoaded = () => setLoaded(true);
  const loadingStyles = !loaded ? { display: 'block' } : { display: 'none' };
  const imgStyles = loaded ? { display: 'inline-block' } : { display: 'none' };

  const card = (
    <>
      <div
        className="rounded-lg h-[574px] sm:h-[304px] md:h-[496px] lg:h-[368px] xl:h-[280px] bg-gray-400 w-full object-cover object-center"
        style={loadingStyles}
      />
      <img
        className="w-full"
        src={img}
        alt=""
        onLoad={onImageLoaded}
        style={imgStyles}
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">${price}</p>
      </div>
    </>
  );

  const content = ref ? (
    <div ref={ref} className="block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
      {card}
    </div>
  ) : (
    <div className="block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
      {card}
    </div>
  );

  return content;
});

export default Card
