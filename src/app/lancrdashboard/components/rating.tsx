import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

type MyProps = {
  value: number,
  onChange: (arg: number) => void
}

export default function StarRating({ value, onChange }: MyProps) {

  return (
    <div className='flex justify-center items-center gap-5 border border-gray-500 py-2 shadow-sm w-11/12 mx-auto rounded-lg
      lg:w-2/3
    '>
      <p className='text-lg'>How would you rate Lancrly?</p>
      <Rating
        style={{ maxWidth: 150 }}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}