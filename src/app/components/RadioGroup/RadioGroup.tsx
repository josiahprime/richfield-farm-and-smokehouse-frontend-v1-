import React from "react"
import { Circle } from "lucide-react"

type RadioGroupProps = {
  name: string
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  children,
  className = "",
}) => {
  return (
    <div className={`grid gap-2 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RadioGroupItemProps>(child)) {
          return React.cloneElement(child, {
            name,
            checked: child.props.value === value,
            onChange: () => onChange(child.props.value),
          })
        }
        return child
      })}

    </div>
  )
}

type RadioGroupItemProps = {
  value: string
  checked?: boolean
  onChange?: () => void
  name?: string
  className?: string
}

export const RadioGroupItem = ({
  value,
  checked,
  onChange,
  name,
  className = "",
}: RadioGroupItemProps) => {
  return (
    <label
      className={`inline-flex items-center cursor-pointer ${className}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <div className={`h-4 w-4 rounded-full border border-gray-500 flex items-center justify-center`}>
        {checked && (
          <Circle className="h-2.5 w-2.5 fill-current text-gray-900" />
        )}
      </div>
    </label>
  )
}
