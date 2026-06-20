import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';  // 塗りつぶし

type Props = {
  score: number
}

export default function StarRating({ score }: Props) {
  console.log("score", score)
   return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= score ? (
          <StarRateIcon
            key={star}
            className='text-yellow-400'
            />
        ) : (
          <StarBorderIcon key={star} />
        )
      )}
    </div>
  )
}