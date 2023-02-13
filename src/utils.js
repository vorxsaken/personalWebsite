/* eslint-disable eqeqeq */
import { useEffect, useState } from 'react'

const getDate = (date) => {
    let utcToDate = new Date(parseInt(date));
    let tanggal = utcToDate.getDate().toString().length > 1 ? utcToDate.getDate() : '0' + utcToDate.getDate();
    let bulan = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    return `${tanggal}/${bulan[utcToDate.getMonth()]}/${utcToDate.getFullYear()}`;

}

const hashtag = (tags) => {
    if (tags) {
        var tag = tags.split('#').filter(p => p != '' && p != ' ');
        if (tag.length > 2) {
            tag = tag.slice(0, 2)
        }
        let hashTag = tag.map((t, index) => (
            <span key={index} className='rounded-md px-1 bg-gray-200 text-slate-800 text-xs'>#{t}</span>
        ))

        return hashTag;
    }
}

const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }
        const listener = () => {
            setMatches(media.matches);
        };
        media.addListener(listener);
        return () => media.removeListener(listener);
    }, [matches, query]);

    return matches;
}

const useCustomeTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | vorxsaken`
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export { getDate, hashtag, useMediaQuery, useCustomeTitle };