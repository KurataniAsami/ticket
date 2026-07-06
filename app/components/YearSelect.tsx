'use client'

type YearSelectProps = {
  value: string
  onChange: (value: string) => void
}

export default function YearSelect({
  value,
  onChange,
}: YearSelectProps) {
  const START_YEAR = 2020
  const currentYear = new Date().getFullYear()

  const years = Array.from(
    { length: currentYear - START_YEAR + 1 },
    (_, index) => String(currentYear - index)
  )

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-[180px] rounded-md border border-gray-600 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-white"
    >
      <option value="">すべての年</option>

      {years.map((year) => (
        <option
          key={year}
          value={year}
        >
          {year}年
        </option>
      ))}
    </select>
  )
}