import { useEffect, useState } from "react";

const Filters = ({ onSearch, onDateFilter }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(searchQuery);
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        const dateTimeoutId = setTimeout(() => {
            onDateFilter(dateFilter);
        }, 400);



        return () => clearTimeout(dateTimeoutId);
    }, [dateFilter]);
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    const handleDateFilter = (e) => {



        setDateFilter(e.target.value)
    }
    const handleTodayFilter = (e) => {
        e.preventDefault();
        setDateFilter(new Date().toISOString().split('T')[0])
    }
    const clearFilters = (e) => {
        e.preventDefault();
        setDateFilter("");
        setSearchQuery("");
    }
    return (
        <div className="w-auto">
            <form className="flex flex-col md:flex-row  space-y-6 space-x-0 md:space-y-0 md:space-x-6" >
                <div className="flex items-center border border-gray-300 rounded-md p-1 px-2 min-w-96">
                    <div className="mr-2">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>
                    <input type="text"
                        id="search"
                        name="search"
                        value={searchQuery}
                        onChange={handleSearchChange} className="flex-grow border-none focus:outline-none" placeholder="Search..." />
                    <div className="ml-2 text-gray-500 font-semibold"><span className="text-xl">|</span> keyword</div>
                </div>
                <div className="flex items-center  border border-gray-300 rounded-md p-1 ">
                    <input type="date"
                        name="date"
                        value={dateFilter}
                        onChange={handleDateFilter} id="deadline" className="mr-2 border-none focus:outline-none" />
                    <div className="mr-2"><i className="fa-solid fa-arrow-right"></i></div>
                    <button className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-md" onClick={handleTodayFilter}>Aujourd'hui</button>
                </div>
                <button className="ml-2 px-4 py-2 bg-green-800 text-white rounded-md" onClick={clearFilters}>Clear Filter</button>
            </form>
        </div>
    )
}

export default Filters