import classNames from 'classnames'

export default function Skeleton({ times, className }) {
  const outerClassNames = classNames(
    className,
    'relative',
    'overflow-hidden',
    'bg-gray-200',
    'rounded',
    'mb-2.5'
  )
  const innerClassNames = classNames(
    className,
    'animate-shimmer',
    'absolute',
    'inset-0',
    '-translate-x-full',
    'bg-gradient-to-r',
    'from-gray-200',
    'via-white',
    'to-gray-200'
  )

  // const boxes = []
  // for (let i = 0; i < times; i++) {
  //   boxes.push(<div className="box" key={i} />)
  // }
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => (
      <div key={i} className={outerClassNames}>
        <div className={innerClassNames} />
      </div>
    ))
  return boxes
}
