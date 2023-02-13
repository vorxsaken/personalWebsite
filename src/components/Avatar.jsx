import React from 'react'

export default function Avatar({ auto, isRounded, borderColor }) {
    const defaultStyle = `border-[0.3rem] ${ borderColor } overflow-hidden relative drop-shadow-lg bg-cover bg-right ${isRounded ? 'rounded-full' : 'rounded-md'}`

    return (
        <div
            className={auto ? `w-full h-full ${ defaultStyle }` : `w-[220px] h-[220px] ${ defaultStyle }`}
            style={{
                backgroundImage: `url(${require("../assets/img/1.jpg")})`,
            }}
        ></div>
    )
}

Avatar.defaultProps = {
    auto: false,
    isRounded: true,
    borderColor: 'border-white'
}