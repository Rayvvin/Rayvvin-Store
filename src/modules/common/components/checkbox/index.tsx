import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string | React.ReactNode
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  label,
}) => {
  return (
    <button
      className="text-base-regular flex items-center gap-x-2"
      role="checkbox"
      type="button"
      aria-checked={checked}
      onClick={onChange}
    >
      <div
        role="checkbox"
        aria-checked={checked}
        className="border border-gray-900 w-5 h-5 flex items-center justify-center"
      >
        {checked ? "✓" : null}
      </div>
      <span className="text-gray-700 text-small-regular">{label}</span>
    </button>
  )
}

export default Checkbox
