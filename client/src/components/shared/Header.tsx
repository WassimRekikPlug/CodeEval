
const Header = () => {
    return (
        <header>
            <nav className="bg-gray-100 border-gray-200 px-4 lg:px-6 py-2.5 text-gray-800">
                <div className="flex flex-wrap justify-between items-center ">
                    <a href="https://flowbite.com" className="flex items-center">

                        <span className="self-center text-xl font-bold whitespace-nowrap ">Mon espace de travail</span>
                    </a>
                    <div className="flex items-center lg:order-2">
                        <a href="#" className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">Log in</a>
                        <a href="#" className="text-gray-800  hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none ">Register</a>

                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Header