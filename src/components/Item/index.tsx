type CardProps = {
  img?: string
  title?: string
  price?: string
}

export function Item({
  img,
  title,
  price,
}: CardProps): JSX.Element {

  return (
    <div className='w-full'>
      <div className="block bg-white shadow-md rounded-lg">
        <img
          className="w-full rounded-t-lg"
          src={img}
          alt=""
        />

        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">${price}</p>
        </div>
      </div>
    </div>
  );
}
