export function Header () {
    return  (
        <div className="px-8 py-6 bg-smooth border-b border-tiny flex items-center">
            <img src="https://picsum.photos/50" alt="profile photo" className="rounded-full max-w-sm"/>
            <div className="ml-3"></div>
            <h3 className="text-2xl text-white">Someone Else</h3>
        </div>
    )
}