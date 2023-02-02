import React, {useState} from "react";
import s from './Paginator.module.css'
import cn from "classnames"

const Paginator = ({currentPage, onPageChanged, totalItemsCount, pageSize, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i);
    let portionCount = Math.ceil(pagesCount/portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;
    return <div className={s.numPagesDiv}>
        { portionNumber > 1 &&
        <a onClick={() => { setPortionNumber(portionNumber - 1)}}>{'<<<'}</a> }
        {pages
            .filter(p => (p >= leftPortionPageNumber && p <= rightPortionPageNumber))
            .map(p => <span className={cn(
                {[s.pageSelected]: p === currentPage},
                s.pageNumber
            )}
                            onClick={(e) => onPageChanged(p)}
                            key={p}>{p}</span>)}
        { portionCount > portionNumber &&
        <a onClick={() => { setPortionNumber(portionNumber + 1)}}>{'>>>'}</a> }
    </div>
}

export default Paginator;