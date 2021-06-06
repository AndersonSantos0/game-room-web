import React, { useState } from 'react'
import { InputContainer, InputIcon, InputLabel } from './styles'
import { BsCalendar, BsEye, BsEyeSlash } from 'react-icons/bs'
import Calendar from 'react-calendar'

import 'react-calendar/dist/Calendar.css'
import moment from 'moment'

interface InputProps {
  label?: string
  placeholder?: string
  value?: string | Date
  type?: 'text' | 'password' | 'button' | 'date'
  onClick?: () => void
  onChange?: (value) => void
}

const Input: React.FC<InputProps> = ({
  value,
  label,
  type = 'text',
  placeholder,
  onClick,
  onChange
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [hasIcon] = useState(type === 'password')
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <InputContainer hasIcon={hasIcon}>
      <InputLabel>{label}</InputLabel>
      <input
        value={
          typeof value !== 'string' ? moment(value).format('yyyy-MM-DD') : value
        }
        placeholder={placeholder}
        type={showPassword ? 'text' : type}
        onClick={onClick}
        onChange={e => onChange(e.target.value)}
      />
      {type === 'password' && (
        <InputIcon onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <BsEyeSlash size={'1.25rem'} />
          ) : (
            <BsEye size={'1.25rem'} />
          )}
        </InputIcon>
      )}
      {type === 'date' && (
        <InputIcon onClick={() => setShowCalendar(!showCalendar)}>
          <BsCalendar size={'1rem'} />
        </InputIcon>
      )}
      {type === 'date' && showCalendar && (
        <Calendar
          value={new Date(value)}
          onChange={e => {
            onChange(e)
            setShowCalendar(false)
          }}
          // onClickDay={(e) => s}
          maxDetail="month"
          minDetail="year"
        />
      )}
    </InputContainer>
  )
}

export default Input
