import React from 'react'
import { FaCalendarWeek } from "react-icons/fa";
import { getDate, hashtag } from '../utils';

function Card({ img, title, des, row, tags, onClick, date }) {
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

    return (
        <div onClick={ onClick } className={`p-2 flex flex-${isRow.flexDir} gap-4 shadow-lg rounded-md py-4 cursor-pointer`}>
            {/* image */}
            <div className={`w-[${isRow.width}] max-w-full h-[160px] bg-black rounded-md 
        bg-cover bg-center`} style={{ backgroundImage: `url(${img})` }} >
            </div>
            {/* content */}
            <div className='w-full min-h-[120px] min-w-[270px] max-w-[270px] flex flex-col gap-2 overflow-hidden'>
                <p className='w-full text-lg text-left break-words font-bold text-slate-800'>{Title()}</p>
                <span className='flex flex-row gap-1 items-center'>
                    <FaCalendarWeek className='text-xs font-bold text-slate-800' />
                    <p className='text-[11px] font-normal'>{ getDate(date) }</p>
                    { hashtag(tags) }
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