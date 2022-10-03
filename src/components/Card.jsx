import React from 'react'
import { FaCalendarWeek } from "react-icons/fa";

function Card({ img, title, des, row, tags }) {
    // apakah card berbentuk row ?
    const isRow = row ? { flexDir: 'row', width: '220px' } : { flexDir: 'col', width: '270px' };
    // memotong title jika panjangnya melebihi 50 karakter
    const Title = () => {
        return title.length > 50 ? title.substr(0, 50) + ' ...' : title;
    }
    //memotong deskripsi jika panjangnya melebihi 130 karakter
    const Desc = () => {
        return des.length > 130 ? des.substr(0, 130) + ' ...' : des;
    }
    const hashtag = () => {
        if (tags) {
            var tag = tags.split('#').filter(p => p != '' && p != ' ');
            if (tag.length > 2) {
                tag = tag.slice(0, 2)
            }
            let hashTag = tag.map((t, index) => (
                <span key={index} className='rounded-md px-2 bg-gray-200 text-slate-800 text-xs'>#{t}</span>
            ))

            return hashTag;
        }
    }
    return (
        <div className={`p-2 flex flex-${isRow.flexDir} gap-4 shadow-lg rounded-md py-4`}>
            {/* image */}
            <div className={`w-[${isRow.width}] max-w-full h-[160px] bg-black rounded-md 
        bg-cover bg-center`} style={{ backgroundImage: `url(${img})` }} >
            </div>
            {/* content */}
            <div className='w-full min-h-[120px] max-w-[270px] flex flex-col gap-2 overflow-hidden'>
                <p className='w-full text-lg text-left break-words font-bold text-slate-800'>{Title()}</p>
                <span className='flex flex-row gap-2 items-center'>
                    <FaCalendarWeek className='text-xs font-bold text-slate-800' />
                    <p className='text-xs font-normal'>10/10/2022</p>
                    {hashtag()}
                </span>
                <span className='w-full text-xs text-left break-words font-light text-gray-500'>{Desc()}</span>
            </div>
        </div>
    )
}

Card.defaultProps = {
    row: false,
    tags: false
}

export default Card