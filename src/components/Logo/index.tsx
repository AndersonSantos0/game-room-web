import React from 'react'

interface LogoProps {
  size: number | string
}

const Logo = ({ size }: LogoProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`calc(${size} / 1.15625)`}
      height={size}
      viewBox="0 0 320 370"
    >
      <defs>
        <clipPath id="_clipPath_W74yTKqBiF0NdhdYgyTccF5YJEwiyjs7">
          <path d="M0 0H320V370H0z" />
        </clipPath>
      </defs>
      <g clipPath="url(#_clipPath_W74yTKqBiF0NdhdYgyTccF5YJEwiyjs7)">
        <path
          fill="#339AFF"
          d="M320 92.308L160 0 0 92.308v185.384L160 370l160-92.308V92.308z"
        />
        <path fill="#0080FF" d="M160 0L0 92.308v185.384L160 370V0z" />
        <path
          fillOpacity="0.2"
          d="M0 278.5L160.5 185 320 277.5 159.5 370 0 278.5z"
        />
        <path
          fill="#FFF"
          fillOpacity="0.3"
          d="M0 92.5L160.5 0 320 91.5 160.5 185 0 92.5z"
        />
      </g>
    </svg>
  )
}

export default Logo
