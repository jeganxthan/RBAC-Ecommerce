import React from 'react'

const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-2 md:w-2 h-3 md:h-5 ${color} rounded-full`} />
            <p className="text-xs md:text-[14px] text-gray-400 flex items-center gap-1">
                <span className="text-sm md:text-[15px] dark:text-white font-semibold text-black">{value}</span>
                {label}
            </p>
        </div>

    )
}

export default InfoCard