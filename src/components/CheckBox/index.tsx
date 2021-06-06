import React from 'react'
import { CheckBoxContainer, CheckBoxLabel } from './styles'

interface CheckBoxProps {
  label?: string
  checked?: boolean
  onChange: (checked) => void
}

const CheckBox: React.FC<CheckBoxProps> = ({ label, checked, onChange }) => {
  return (
    <CheckBoxContainer>
      <input
        checked={checked}
        onChange={() => onChange && onChange(!checked)}
        type="checkbox"
      />
      <CheckBoxLabel onClick={() => onChange && onChange(!checked)}>
        {label}
      </CheckBoxLabel>
    </CheckBoxContainer>
  )
}

export default CheckBox
