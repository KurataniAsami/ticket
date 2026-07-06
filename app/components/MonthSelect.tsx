'use client'

type MonthSelectProps = {
  value: string
  onChange: (value: string) => void
}

export default function MonthSelect({
  value,
  onChange,
}: MonthSelectProps) {
  const months = Array.from(
    { length: 12 },
    (_, index) => String(index + 1)
  )

  return (
    <div className="ml-3">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-[180px] rounded-md border border-gray-600 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
    >

      {months.map((month) => (
        <option
          key={month}
          value={month}
        >
          {month}月
        </option>
      ))}
    </select>
    </div>
  )
}